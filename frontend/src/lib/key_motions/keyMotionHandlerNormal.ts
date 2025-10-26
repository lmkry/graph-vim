import { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { handleAddNode, handleDeleteNode } from '../graphActions';
import type { Node } from '../types';

export class KeyMotionHandlerNormal extends KeyMotionHandlerBase {
  private setNodes: (n: Node[]) => void;

  constructor(setNodes: (n: Node[]) => void) {
    super();
    this.setNodes = setNodes;
  }

  protected defineKeyMotions(): void {
    this.addKeyMotion('an', () => handleAddNode(this.setNodes));
    this.addKeyMotion('dn', () => handleDeleteNode(this.setNodes));
  }

}
