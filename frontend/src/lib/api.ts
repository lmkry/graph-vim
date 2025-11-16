/**
* api.ts is the API layer responsible for communicating with the Go backend to update the graph
* state.
*/

import { GetNodes, AddNode, DeleteNode, UpdateNodeText } from '../../wailsjs/go/app/App';
import type { Node, AddNodeResult } from './types';

export async function getNodes(): Promise<Node[]> {
  return await GetNodes();
}

export async function addNode(): Promise<AddNodeResult> {
  return await AddNode();
}

export async function deleteNode(): Promise<Node[]> {
  return await DeleteNode();
}

export async function updateNodeText(nodeID: string, text: string): Promise<Node[]> {
  return await UpdateNodeText(nodeID, text);
}

