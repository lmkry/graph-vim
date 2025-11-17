import { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { handleUpdateNodeText } from '../graphActions';
import { GraphEvents, type ModeChangeRequestedEvent } from '../events/graphEvents';
import type { Node } from '../types';

export class KeyMotionHandlerInsert extends KeyMotionHandlerBase {
  private setNodes: (n: Node[]) => void;
  private focusedNodeID: string;
  private currentText: string;

  constructor(setNodes: (n: Node[]) => void, focusedNodeID: string, initialText: string) {
    super();
    this.setNodes = setNodes;
    this.focusedNodeID = focusedNodeID;
    this.currentText = initialText;
  }

  protected defineKeyMotions(): void {
  }

  handleKeyPress(key: string): void {
    if (key === 'Escape') {
      this.eventBus.emit<ModeChangeRequestedEvent>(GraphEvents.MODE_CHANGE_REQUESTED, {
        mode: 'NORMAL',
      });
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
