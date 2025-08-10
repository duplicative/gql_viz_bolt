import * as d3 from 'd3';
import type { GraphQLNode, VisualizationOptions } from './types';

export class GraphQLVisualizer {
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private container: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private options: VisualizationOptions;
  private onNodeEdit?: (nodeId: string, newName: string) => void;
  private onNodeDelete?: (nodeId: string) => void;

  constructor(
    containerId: string, 
    options: Partial<VisualizationOptions> = {},
    callbacks: {
      onNodeEdit?: (nodeId: string, newName: string) => void;
      onNodeDelete?: (nodeId: string) => void;
    } = {}
  ) {
    this.options = {
      width: 800,
      height: 600,
      nodeRadius: 25,
      levelHeight: 80,
      ...options
    };

    this.onNodeEdit = callbacks.onNodeEdit;
    this.onNodeDelete = callbacks.onNodeDelete;

    // Clear existing content
    d3.select(`#${containerId}`).selectAll('*').remove();

    // Create SVG
    this.svg = d3.select(`#${containerId}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background', 'transparent');

    // Create zoom behavior
    this.zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        this.container.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);

    // Create container for the graph
    this.container = this.svg.append('g')
      .attr('class', 'graph-container');
  }

  public visualize(nodes: GraphQLNode[]): void {
    if (nodes.length === 0) {
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();

    // Create hierarchy layout
    const hierarchyData = this.createHierarchy(nodes);
    const treeLayout = d3.tree<GraphQLNode>()
      .size([this.options.width - 100, this.options.height - 100])
      .separation((a, b) => {
        const aWidth = this.getNodeWidth(a.data);
        const bWidth = this.getNodeWidth(b.data);
        return (aWidth + bWidth) / 60 + 1;
      });

    const root = treeLayout(hierarchyData);

    // Get all nodes and links
    const treeNodes = root.descendants();
    const treeLinks = root.links();

    // Update node positions
    treeNodes.forEach(d => {
      d.data.x = d.x;
      d.data.y = d.y;
    });

    this.renderLinks(treeLinks);
    this.renderNodes(treeNodes);

    // Center the visualization
    this.centerVisualization();
  }

  private createHierarchy(nodes: GraphQLNode[]): d3.HierarchyNode<GraphQLNode> {
    // Create a virtual root if there are multiple root nodes
    if (nodes.length === 1) {
      return d3.hierarchy(nodes[0], d => d.children);
    } else {
      const virtualRoot: GraphQLNode = {
        id: 'virtual-root',
        name: 'GraphQL Document',
        type: 'query',
        children: nodes
      };
      return d3.hierarchy(virtualRoot, d => d.children);
    }
  }

  private getNodeWidth(node: GraphQLNode): number {
    // Estimate width based on text length
    const baseWidth = 80;
    const charWidth = 8;
    const padding = 20;
    
    // Handle multi-line text
    const lines = node.name.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    return Math.max(baseWidth, maxLineLength * charWidth + padding);
  }

  private getNodeHeight(node: GraphQLNode): number {
    const baseHeight = this.options.nodeRadius * 1.6;
    const lines = node.name.split('\n');
    
    if (lines.length > 1) {
      return baseHeight + (lines.length - 1) * 20;
    }
    
    return baseHeight;
  }

  private renderLinks(links: d3.HierarchyLink<GraphQLNode>[]): void {
    const linkSelection = this.container
      .selectAll<SVGPathElement, d3.HierarchyLink<GraphQLNode>>('.link')
      .data(links, d => `${d.source.data.id}-${d.target.data.id}`);

    // Remove old links
    linkSelection.exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove();

    // Add new links
    const linkEnter = linkSelection.enter()
      .append('path')
      .attr('class', 'link')
      .style('opacity', 0);

    // Update all links
    linkSelection.merge(linkEnter)
      .transition()
      .duration(300)
      .style('opacity', 1)
      .attr('d', d => {
        const source = [d.source.data.x!, d.source.data.y!];
        const target = [d.target.data.x!, d.target.data.y!];
        
        return d3.linkVertical()
          .x(d => d[0])
          .y(d => d[1])
          .source(() => source)
          .target(() => target)();
      });
  }

  private renderNodes(nodes: d3.HierarchyNode<GraphQLNode>[]): void {
    const nodeSelection = this.container
      .selectAll<SVGGElement, d3.HierarchyNode<GraphQLNode>>('.node')
      .data(nodes, d => d.data.id);

    // Remove old nodes
    nodeSelection.exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove();

    // Add new nodes
    const nodeEnter = nodeSelection.enter()
      .append('g')
      .attr('class', d => {
        let className = `node ${d.data.type}`;
        if (d.data.name.startsWith('Variables\n')) {
          className += ' variables';
        }
        return className;
      })
      .style('opacity', 0)
      .on('dblclick', (event, d) => this.editNode(event, d))
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        if (d.data.id !== 'virtual-root') {
          this.deleteNode(d);
        }
      });

    // Add pill-shaped rectangles
    nodeEnter.append('rect')
      .attr('class', 'node-rect')
      .attr('width', d => this.getNodeWidth(d.data))
      .attr('height', d => this.getNodeHeight(d.data))
      .attr('x', d => -this.getNodeWidth(d.data) / 2)
      .attr('y', d => -this.getNodeHeight(d.data) / 2)
      .attr('rx', d => this.options.nodeRadius * 0.8)
      .attr('ry', d => this.options.nodeRadius * 0.8);

    // Add text
    const textElement = nodeEnter.append('text')
      .attr('class', 'node-text')
      .each(function(d) {
        const lines = d.data.name.split('\n');
        const textSelection = d3.select(this);
        
        if (lines.length === 1) {
          textSelection.text(lines[0]);
        } else {
          lines.forEach((line, i) => {
            textSelection.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? '0.35em' : '1.2em')
              .text(line);
          });
        }
      });

    // Add argument indicator
    nodeEnter
      .filter(d => d.data.arguments && d.data.arguments.trim())
      .append('circle')
      .attr('class', 'argument-indicator')
      .attr('r', 3)
      .attr('cx', d => this.getNodeWidth(d.data) / 2 - 8)
      .attr('cy', d => -this.getNodeHeight(d.data) / 2 + 8)
      .append('title')
      .text(d => d.data.arguments || '');

    // Add delete button (hidden by default)
    const deleteButton = nodeEnter
      .filter(d => d.data.id !== 'virtual-root')
      .append('g')
      .attr('class', 'node-delete')
      .on('click', (event, d) => {
        event.stopPropagation();
        this.deleteNode(d);
      });

    deleteButton.append('circle')
      .attr('r', 8)
      .attr('cx', d => this.getNodeWidth(d.data) / 2 + 12)
      .attr('cy', d => -this.getNodeHeight(d.data) / 2 - 8);

    deleteButton.append('text')
      .attr('x', d => this.getNodeWidth(d.data) / 2 + 12)
      .attr('y', d => -this.getNodeHeight(d.data) / 2 - 8)
      .text('×');

    // Update all nodes
    const nodeUpdate = nodeSelection.merge(nodeEnter);
    
    nodeUpdate
      .transition()
      .duration(300)
      .style('opacity', 1)
      .attr('transform', d => `translate(${d.data.x},${d.data.y})`);

    // Update rectangles
    nodeUpdate.select('.node-rect')
      .transition()
      .duration(300)
      .attr('width', d => this.getNodeWidth(d.data))
      .attr('height', d => this.getNodeHeight(d.data))
      .attr('x', d => -this.getNodeWidth(d.data) / 2)
      .attr('y', d => -this.getNodeHeight(d.data) / 2)
      .attr('rx', d => this.options.nodeRadius * 0.8)
      .attr('ry', d => this.options.nodeRadius * 0.8);

    // Update text
    nodeUpdate.select('.node-text')
      .each(function(d) {
        const lines = d.data.name.split('\n');
        const textSelection = d3.select(this);
        
        // Clear existing content
        textSelection.selectAll('*').remove();
        textSelection.text('');
        
        if (lines.length === 1) {
          textSelection.text(lines[0]);
        } else {
          lines.forEach((line, i) => {
            textSelection.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? '0.35em' : '1.2em')
              .text(line);
          });
        }
      });
  }

  private editNode(event: MouseEvent, node: d3.HierarchyNode<GraphQLNode>): void {
    if (node.data.id === 'virtual-root') return;

    const nodeElement = event.currentTarget as SVGGElement;
    const textElement = d3.select(nodeElement).select('.node-text');
    const currentText = textElement.text();

    // Hide text
    textElement.style('display', 'none');

    // Create input element
    const foreignObject = d3.select(nodeElement)
      .append('foreignObject')
      .attr('width', 150)
      .attr('height', 25)
      .attr('x', -75)
      .attr('y', -12.5);

    const input = foreignObject
      .append('xhtml:input')
      .attr('class', 'node-input')
      .attr('type', 'text')
      .attr('value', currentText)
      .style('width', '100%')
      .style('text-align', 'center');

    // Focus and select all text
    (input.node() as HTMLInputElement)?.focus();
    (input.node() as HTMLInputElement)?.select();

    const finishEdit = (save: boolean = true) => {
      const newText = (input.node() as HTMLInputElement).value.trim();
      
      foreignObject.remove();
      textElement.style('display', 'block');

      if (save && newText && newText !== currentText) {
        textElement.text(newText);
        if (this.onNodeEdit) {
          this.onNodeEdit(node.data.id, newText);
        }
      }
    };

    input.on('blur', () => finishEdit(true));
    input.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        finishEdit(true);
      } else if (event.key === 'Escape') {
        finishEdit(false);
      }
      event.stopPropagation();
    });
  }

  private deleteNode(node: d3.HierarchyNode<GraphQLNode>): void {
    if (node.data.id === 'virtual-root') return;
    
    if (this.onNodeDelete) {
      this.onNodeDelete(node.data.id);
    }
  }

  private centerVisualization(): void {
    const bounds = this.container.node()?.getBBox();
    if (!bounds) return;

    const containerRect = this.svg.node()?.getBoundingClientRect();
    if (!containerRect) return;

    const width = containerRect.width;
    const height = containerRect.height;
    
    const scale = Math.min(
      0.9 * width / bounds.width,
      0.9 * height / bounds.height,
      1
    );

    const x = (width - bounds.width * scale) / 2 - bounds.x * scale;
    const y = (height - bounds.height * scale) / 2 - bounds.y * scale;

    this.svg
      .transition()
      .duration(500)
      .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
  }

  public resetZoom(): void {
    this.centerVisualization();
  }

  public zoomIn(): void {
    this.svg
      .transition()
      .duration(300)
      .call(this.zoom.scaleBy, 1.5);
  }

  public zoomOut(): void {
    this.svg
      .transition()
      .duration(300)
      .call(this.zoom.scaleBy, 1 / 1.5);
  }

  public resize(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;
    this.svg
      .attr('width', width)
      .attr('height', height);
  }

  private showEmptyState(): void {
    this.container.selectAll('*').remove();
    // Empty state is handled by CSS
  }

  private hideEmptyState(): void {
    // The SVG content will replace the empty state
  }
}
