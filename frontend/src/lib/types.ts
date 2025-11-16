export interface Node {
  ID: string;
  Text: string;
  X: number;
  Y: number;
}

export interface AddNodeResult {
  NodeID: string;
  Nodes: Node[];
}
