export interface GraphQLNode {
  id: string;
  name: string;
  type: 'query' | 'mutation' | 'subscription' | 'field' | 'fragment';
  arguments?: string;
  children: GraphQLNode[];
  parent?: GraphQLNode;
  x?: number;
  y?: number;
}

export interface ParsedQuery {
  nodes: GraphQLNode[];
  errors: string[];
}

export interface VisualizationOptions {
  width: number;
  height: number;
  nodeRadius: number;
  levelHeight: number;
}