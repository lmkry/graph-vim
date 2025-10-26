/**
* graphActions.ts is a controller layer. It handles the interaction between the UI components and
* the API layer for managing graph nodes. This is mostly done for separation of concerns and to
* keep the UI components clean and focused on rendering.
*/

import { getNodes, addNode, deleteNode } from './api';
import type { Node } from './types';

export async function handleGetNodes (setNodes: (n: Node[]) => void) {
  const nodes = await getNodes();    
  setNodes(nodes);
} 

export async function handleAddNode (setNodes: (n: Node[]) => void) {
  const nodes = await addNode();
  setNodes(nodes);
}

export async function handleDeleteNode (setNodes: (n: Node[]) => void) {
  const nodes = await deleteNode();
  setNodes(nodes);
}
