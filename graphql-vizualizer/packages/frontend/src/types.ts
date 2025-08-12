import type { Caido } from "@caido/sdk-frontend";

export interface GraphQLNode {
  id: string;
  name: string;
  type: 'query' | 'mutation' | 'subscription' | 'field' | 'fragment';
  children: GraphQLNode[];
  parent?: GraphQLNode;
  arguments?: string;
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

export type FrontendSDK = Caido;
