/**
* api.ts is the API layer responsible for communicating with the Go backend to update the graph
* state.
*/

import { GetNodes, AddNode, DeleteNode } from '../../wailsjs/go/app/App';
import type { Node } from './types';

export async function getNodes(): Promise<Node[]> {
  return await GetNodes();
}

export async function addNode(): Promise<Node[]> {
  const result = await AddNode();
  return result 
}

export async function deleteNode(): Promise<Node[]> {
  return await DeleteNode();
}

