import { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { handleAddNode, handleDeleteNode } from '../graphActions';
import type { Node } from '../types';

export class KeyMotionHandlerNormal extends KeyMotionHandlerBase {
  private setNodes: (n: Node[]) => void;
  private onEnterInsertMode: (nodeID: string) => void;

  constructor(setNodes: (n: Node[]) => void, onEnterInsertMode: (nodeID: string) => void) {
    super();
    this.setNodes = setNodes;
    this.onEnterInsertMode = onEnterInsertMode;
  }

  protected defineKeyMotions(): void {
    this.addKeyMotion('an', () => handleAddNode(this.setNodes, (nodeID) => this.onEnterInsertMode(nodeID)));
    this.addKeyMotion('dn', () => handleDeleteNode(this.setNodes));
  }

}
