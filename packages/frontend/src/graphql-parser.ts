import { parse, visit, DocumentNode, OperationDefinitionNode, FieldNode, FragmentDefinitionNode } from 'graphql';
import type { GraphQLNode, ParsedQuery } from './types';

interface GraphQLRequestBody {
  query: string;
  operationName?: string;
  variables?: Record<string, any>;
}

function extractQueryFromInput(input: string): { query: string; operationName?: string; variables?: Record<string, any> } {
  const trimmedInput = input.trim();
  
  // Check if input looks like JSON
  if (trimmedInput.startsWith('{') && trimmedInput.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmedInput) as GraphQLRequestBody;
      if (parsed.query && typeof parsed.query === 'string') {
        return {
          query: parsed.query,
          operationName: parsed.operationName,
          variables: parsed.variables
        };
      }
    } catch (error) {
      // If JSON parsing fails, treat as raw GraphQL
    }
  }
  
  // Treat as raw GraphQL query
  return { query: trimmedInput };
}

let nodeIdCounter = 0;

function generateId(): string {
  return `node-${nodeIdCounter++}`;
}

function formatArguments(args: any[]): string {
  if (!args || args.length === 0) return '';
  
  return args.map(arg => {
    const name = arg.name.value;
    let value = '';
    
    if (arg.value.kind === 'StringValue') {
      value = `"${arg.value.value}"`;
    } else if (arg.value.kind === 'IntValue') {
      value = arg.value.value;
    } else if (arg.value.kind === 'Variable') {
      value = `$${arg.value.name.value}`;
    } else if (arg.value.kind === 'BooleanValue') {
      value = arg.value.value.toString();
    } else {
      value = 'Complex';
    }
    
    return `${name}: ${value}`;
  }).join(', ');
}

function processSelectionSet(selectionSet: any, parent: GraphQLNode, fragments: Map<string, GraphQLNode>): void {
  if (!selectionSet?.selections) return;

  for (const selection of selectionSet.selections) {
    if (selection.kind === 'Field') {
      const fieldNode: GraphQLNode = {
        id: generateId(),
        name: selection.name.value,
        type: 'field',
        children: [],
        parent,
        arguments: formatArguments(selection.arguments)
      };

      parent.children.push(fieldNode);

      if (selection.selectionSet) {
        processSelectionSet(selection.selectionSet, fieldNode, fragments);
      }
    } else if (selection.kind === 'FragmentSpread') {
      const fragmentName = selection.name.value;
      const fragment = fragments.get(fragmentName);
      
      if (fragment) {
        // Create a reference node for the fragment
        const fragmentRef: GraphQLNode = {
          id: generateId(),
          name: `...${fragmentName}`,
          type: 'fragment',
          children: [...fragment.children],
          parent,
          arguments: ''
        };
        
        parent.children.push(fragmentRef);
      }
    } else if (selection.kind === 'InlineFragment') {
      // Handle inline fragments
      if (selection.selectionSet) {
        processSelectionSet(selection.selectionSet, parent, fragments);
      }
    }
  }
}

export function parseGraphQLQuery(queryString: string): ParsedQuery {
  const errors: string[] = [];
  const nodes: GraphQLNode[] = [];

  try {
    // Extract query from input (handles both JSON and raw GraphQL)
    const { query: extractedQuery, variables, operationName } = extractQueryFromInput(queryString);
    
    if (!extractedQuery.trim()) {
      return { nodes: [], errors: ['No query found in input'] };
    }

    // Reset counter for consistent node IDs
    nodeIdCounter = 0;
    
    const document: DocumentNode = parse(extractedQuery);
    const fragments = new Map<string, GraphQLNode>();

    // First pass: collect fragments
    visit(document, {
      FragmentDefinition(node: FragmentDefinitionNode) {
        const fragmentNode: GraphQLNode = {
          id: generateId(),
          name: node.name.value,
          type: 'fragment',
          children: [],
          arguments: `on ${node.typeCondition.name.value}`
        };

        fragments.set(node.name.value, fragmentNode);
        
        if (node.selectionSet) {
          processSelectionSet(node.selectionSet, fragmentNode, fragments);
        }
      }
    });

    // Second pass: process operations
    visit(document, {
      OperationDefinition(node: OperationDefinitionNode) {
        const operationName = node.name?.value || node.operation;
        const queryVariables = node.variableDefinitions?.map(v => {
          const varName = v.variable.name.value;
          const typeName = v.type.kind === 'NonNullType' 
            ? `${(v.type.type as any).name.value}!`
            : (v.type as any).name?.value || 'Unknown';
          return `$${varName}: ${typeName}`;
        }).join(', ') || '';

        const operationNode: GraphQLNode = {
          id: generateId(),
          name: operationName,
          type: node.operation as 'query' | 'mutation' | 'subscription',
          children: [],
          arguments: queryVariables
        };

        // Add variables node if variables exist in the JSON input
        if (variables && Object.keys(variables).length > 0) {
          const variableLines = Object.entries(variables).map(([key, value]) => {
            return `${key}: ${JSON.stringify(value)}`;
          });
          
          const variablesNode: GraphQLNode = {
            id: generateId(),
            name: `Variables\n${variableLines.join('\n')}`,
            type: 'field',
            children: [],
            parent: operationNode
          };
          
          operationNode.children.unshift(variablesNode);
        }

        nodes.push(operationNode);

        if (node.selectionSet) {
          processSelectionSet(node.selectionSet, operationNode, fragments);
        }
      }
    });

    return { nodes, errors };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
    errors.push(`GraphQL Parse Error: ${errorMessage}`);
    return { nodes: [], errors };
  }
}

export function generateQueryFromNodes(nodes: GraphQLNode[]): string {
  const fragments = new Set<string>();
  const operations: string[] = [];

  function generateSelectionSet(children: GraphQLNode[], indentLevel = 1): string {
    if (children.length === 0) return '';

    const indent = '  '.repeat(indentLevel);
    const selections: string[] = [];

    for (const child of children) {
      let field = child.name;
      
      if (child.arguments && child.arguments.trim()) {
        field += `(${child.arguments})`;
      }

      if (child.children.length > 0) {
        const subSelections = generateSelectionSet(child.children, indentLevel + 1);
        field += ` {\n${subSelections}\n${indent}}`;
      }

      selections.push(`${indent}${field}`);
    }

    return selections.join('\n');
  }

  for (const rootNode of nodes) {
    let operation = rootNode.type;
    
    if (rootNode.name !== rootNode.type) {
      operation += ` ${rootNode.name}`;
    }
    
    if (rootNode.arguments && rootNode.arguments.trim()) {
      operation += `(${rootNode.arguments})`;
    }

    const selectionSet = generateSelectionSet(rootNode.children);
    operations.push(`${operation} {\n${selectionSet}\n}`);
  }

  return operations.join('\n\n');
}
