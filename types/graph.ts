export interface GraphNode {
  id: string;
  name: string;
  path: string;
  extension: string;
  size?: number;
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface RepoGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
