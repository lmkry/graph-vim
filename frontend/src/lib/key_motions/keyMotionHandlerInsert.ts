import { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { handleUpdateNodeText } from '../graphActions';
import type { Node } from '../types';

export class KeyMotionHandlerInsert extends KeyMotionHandlerBase {
  private setNodes: (n: Node[]) => void;
  private focusedNodeID: string;
  private currentText: string;
  private onExitInsertMode: () => void;

  constructor(setNodes: (n: Node[]) => void, focusedNodeID: string, initialText: string, onExitInsertMode: () => void) {
    super();
    this.setNodes = setNodes;
    this.focusedNodeID = focusedNodeID;
    this.currentText = initialText;
    this.onExitInsertMode = onExitInsertMode;
  }

  protected defineKeyMotions(): void {
  }

  handleKeyPress(key: string): void {
    if (key === 'Escape') {
      this.onExitInsertMode();
      return;
    }

    if (key === 'Backspace') {
      if (this.currentText.length > 0) {
        this.currentText = this.currentText.slice(0,-1);
        handleUpdateNodeText(this.focusedNodeID, this.currentText, this.setNodes);
      }
      return;
    }

    // Ignore special keys (Arrow, Shift, Ctrl, etc.)
    if (key.length > 1) {
      return;
    }

    this.currentText += key;
    handleUpdateNodeText(this.focusedNodeID, this.currentText, this.setNodes);
  }

}
