import { parseGraphQLQuery, generateQueryFromNodes } from './graphql-parser';
import { GraphQLVisualizer } from './visualizer';
import type { GraphQLNode } from './types';
import type { Caido } from "@caido/sdk-frontend";

export class GraphQLVisualizerApp {
  private visualizer: GraphQLVisualizer;
  private currentNodes: GraphQLNode[] = [];
  private debounceTimer: number | null = null;
  private isDragging = false;
  private originalInputFormat: 'json' | 'graphql' = 'graphql';
  private originalOperationName?: string;
  private originalVariables?: Record<string, any>;
  
  // UI Elements
  private queryInput: HTMLTextAreaElement;
  private visualizeBtn: HTMLButtonElement;
  private resetZoomBtn: HTMLButtonElement;
  private zoomInBtn: HTMLButtonElement;
  private zoomOutBtn: HTMLButtonElement;
  private errorMessage: HTMLElement;
  private statusIndicator: HTMLElement;
  private statusDot: HTMLElement;
  private statusText: HTMLElement;
  private leftPanel: HTMLElement;
  private rightPanel: HTMLElement;
  private divider: HTMLElement;

  constructor(private sdk: Caido) {
    this.initializeElements();
    this.initializeVisualizer();
    this.setupEventListeners();
    this.setupResizablePanels();
    this.loadSampleQuery();
  }

  private initializeElements(): void {
    this.queryInput = document.getElementById('query-input') as HTMLTextAreaElement;
    this.visualizeBtn = document.getElementById('visualize-btn') as HTMLButtonElement;
    this.resetZoomBtn = document.getElementById('reset-zoom') as HTMLButtonElement;
    this.zoomInBtn = document.getElementById('zoom-in') as HTMLButtonElement;
    this.zoomOutBtn = document.getElementById('zoom-out') as HTMLButtonElement;
    this.errorMessage = document.getElementById('error-message') as HTMLElement;
    this.statusIndicator = document.getElementById('status-indicator') as HTMLElement;
    this.statusDot = this.statusIndicator.querySelector('.status-dot') as HTMLElement;
    this.statusText = this.statusIndicator.querySelector('.status-text') as HTMLElement;
    this.leftPanel = document.querySelector('.left-panel') as HTMLElement;
    this.rightPanel = document.querySelector('.right-panel') as HTMLElement;
    this.divider = document.getElementById('divider') as HTMLElement;

    if (!this.queryInput || !this.visualizeBtn || !this.zoomInBtn || !this.zoomOutBtn || !this.errorMessage || !this.statusIndicator) {
      throw new Error('Required DOM elements not found');
    }
  }

  private initializeVisualizer(): void {
    this.visualizer = new GraphQLVisualizer('visualization', {
      width: this.rightPanel.offsetWidth,
      height: this.rightPanel.offsetHeight,
      nodeRadius: 25,
      levelHeight: 80
    }, {
      onNodeEdit: (nodeId: string, newName: string) => this.handleNodeEdit(nodeId, newName),
      onNodeDelete: (nodeId: string) => this.handleNodeDelete(nodeId)
    });
  }

  private setupEventListeners(): void {
    // Input events
    this.queryInput.addEventListener('input', () => this.handleInputChange());
    this.queryInput.addEventListener('paste', () => {
      // Small delay to allow paste to complete
      setTimeout(() => this.handleInputChange(), 10);
    });

    // Button events
    this.visualizeBtn.addEventListener('click', () => this.visualizeQuery());
    this.resetZoomBtn.addEventListener('click', () => this.visualizer.resetZoom());
    this.zoomInBtn.addEventListener('click', () => this.visualizer.zoomIn());
    this.zoomOutBtn.addEventListener('click', () => this.visualizer.zoomOut());

    // Window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  private setupResizablePanels(): void {
    let startX = 0;
    let startLeftWidth = 0;
    let startRightWidth = 0;

    const onMouseDown = (e: MouseEvent) => {
      this.isDragging = true;
      startX = e.clientX;
      startLeftWidth = this.leftPanel.offsetWidth;
      startRightWidth = this.rightPanel.offsetWidth;
      
      this.divider.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - startX;
      const containerWidth = this.leftPanel.parentElement!.offsetWidth - 4; // Account for divider width
      
      let newLeftWidth = startLeftWidth + deltaX;
      let newRightWidth = startRightWidth - deltaX;
      
      // Enforce minimum widths (200px)
      const minWidth = 200;
      if (newLeftWidth < minWidth) {
        newLeftWidth = minWidth;
        newRightWidth = containerWidth - minWidth;
      } else if (newRightWidth < minWidth) {
        newRightWidth = minWidth;
        newLeftWidth = containerWidth - minWidth;
      }
      
      // Update panel widths
      this.leftPanel.style.width = `${newLeftWidth}px`;
      this.rightPanel.style.width = `${newRightWidth}px`;
    };

    const onMouseUp = () => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      this.divider.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    this.divider.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private handleInputChange(): void {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set status to processing
    this.setStatus('processing', 'Parsing...');

    // Debounce the visualization
    this.debounceTimer = window.setTimeout(() => {
      this.visualizeQuery();
    }, 500);
  }

  private visualizeQuery(): void {
    const queryText = this.queryInput.value.trim();
    
    if (!queryText) {
      this.currentNodes = [];
      this.visualizer.visualize([]);
      this.setStatus('ready', 'Ready');
      this.hideError();
      return;
    }

    // Detect and store the input format
    this.detectInputFormat(queryText);
    try {
      const result = parseGraphQLQuery(queryText);
      
      if (result.errors.length > 0) {
        this.showError(result.errors.join('\n'));
        this.setStatus('error', 'Parse Error');
        this.visualizer.visualize([]);
      } else {
        this.currentNodes = result.nodes;
        this.visualizer.visualize(result.nodes);
        this.hideError();
        this.setStatus('success', 'Visualized');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.showError(`Error: ${errorMessage}`);
      this.setStatus('error', 'Error');
      this.visualizer.visualize([]);
    }
  }

  private handleNodeEdit(nodeId: string, newName: string): void {
    const updateNodeName = (node: GraphQLNode): boolean => {
      if (node.id === nodeId) {
        node.name = newName;
        return true;
      }
      
      for (const child of node.children) {
        if (updateNodeName(child)) {
          return true;
        }
      }
      
      return false;
    };

    // Update the node in our data structure
    for (const rootNode of this.currentNodes) {
      if (updateNodeName(rootNode)) {
        break;
      }
    }

    // Regenerate the query text, preserving JSON format if original was JSON
    this.updateQueryInput();
    
    // Re-visualize to update the display
    this.visualizer.visualize(this.currentNodes);
  }

  private handleNodeDelete(nodeId: string): void {
    const removeNode = (nodes: GraphQLNode[], targetId: string): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === targetId) {
          nodes.splice(i, 1);
          return true;
        }
        
        if (removeNode(nodes[i].children, targetId)) {
          return true;
        }
      }
      return false;
    };

    // Remove the node from our data structure
    removeNode(this.currentNodes, nodeId);

    // Regenerate the query text, preserving JSON format if original was JSON
    this.updateQueryInput();
    
    // Re-visualize to update the display
    this.visualizer.visualize(this.currentNodes);
  }

  private detectInputFormat(input: string): void {
    const trimmedInput = input.trim();
    
    if (trimmedInput.startsWith('{') && trimmedInput.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmedInput);
        if (parsed.query && typeof parsed.query === 'string') {
          this.originalInputFormat = 'json';
          this.originalOperationName = parsed.operationName;
          this.originalVariables = parsed.variables;
          return;
        }
      } catch (error) {
        // Fall through to GraphQL format
      }
    }
    
    this.originalInputFormat = 'graphql';
    this.originalOperationName = undefined;
    this.originalVariables = undefined;
  }

  private updateQueryInput(): void {
    const newQueryText = generateQueryFromNodes(this.currentNodes);
    
    if (this.originalInputFormat === 'json') {
      // Reconstruct JSON format
      const jsonOutput: any = {
        query: newQueryText
      };
      
      if (this.originalOperationName) {
        jsonOutput.operationName = this.originalOperationName;
      }
      
      if (this.originalVariables) {
        jsonOutput.variables = this.originalVariables;
      }
      
      this.queryInput.value = JSON.stringify(jsonOutput, null, 2);
    } else {
      // Keep as raw GraphQL
      this.queryInput.value = newQueryText;
    }
  }

  private setStatus(type: 'ready' | 'processing' | 'success' | 'error', message: string): void {
    this.statusDot.className = `status-dot ${type === 'ready' ? '' : type}`;
    this.statusText.textContent = message;
  }

  private showError(message: string): void {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove('hidden');
    this.errorMessage.classList.add('fade-in');
  }

  private hideError(): void {
    this.errorMessage.classList.add('hidden');
    this.errorMessage.classList.remove('fade-in');
  }

  private handleResize(): void {
    // Update visualizer dimensions
    const container = document.getElementById('visualization');
    if (container) {
      const rect = container.getBoundingClientRect();
      this.visualizer.resize(rect.width, rect.height);
    }
  }

  public setQuery(query: string) {
    this.queryInput.value = query;
    this.visualizeQuery();
  }

  private loadSampleQuery(): void {
    const sampleQuery = `{
  "operationName": "getUsers",
  "variables": {
    "orgId": "812ddf56-2fbc-4996-9279-3b12421026f9"
  },
  "query": "query getUsers($orgId: ID!) {\\n  organization(orgId: $orgId) {\\n    name\\n    description\\n    id\\n    ...fieldsOnOrganizationWithUsers\\n    __typename\\n  }\\n}\\n\\nfragment fieldsOnOrganizationWithUsers on Organization {\\n  users {\\n    orgId\\n    orgName\\n    usersList {\\n      email\\n      userId\\n      status\\n      roles {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}"
}`;
    
    this.queryInput.value = sampleQuery;
    // Small delay to ensure DOM is ready
    setTimeout(() => this.visualizeQuery(), 100);
  }
}
