/**
* graphActions.ts is a controller layer. It handles the interaction between the UI components and
* the API layer for managing graph nodes. This is mostly done for separation of concerns and to
* keep the UI components clean and focused on rendering.
*/

import { getNodes, addNode, deleteNode, updateNodeText } from './api';
import type { Node } from './types';

export async function handleGetNodes (setNodes: (n: Node[]) => void) {
  const nodes = await getNodes();    
  setNodes(nodes);
} 

export async function handleAddNode (setNodes: (n: Node[]) => void, onNodeCreated?: (nodeID: string) => void) {
  const result = await addNode();
  setNodes(result.Nodes);
  if (onNodeCreated && result.NodeID) {
    onNodeCreated(result.NodeID);
  }
}

export async function handleDeleteNode (setNodes: (n: Node[]) => void) {
  const nodes = await deleteNode();
  setNodes(nodes);
}

export async function handleUpdateNodeText(nodeID: string, text: string, setNodes: (n: Node[]) => void) {
  const nodes = await updateNodeText(nodeID, text);
  setNodes(nodes);
}
