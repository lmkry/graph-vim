import type { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { KeyMotionHandlerNormal } from './keyMotionHandlerNormal';
import { KeyMotionHandlerInsert } from './keyMotionHandlerInsert';
import { Modes } from './modes';
import type { Node } from '../types';

export function KeyMotionHandlerFactory(
  setNodes: (n: Node[]) => void,
  mode: Modes,
  focusedNodeID?: string,
  initialText?: string
): KeyMotionHandlerBase {
  if (mode === Modes.NORMAL) {
    return new KeyMotionHandlerNormal(setNodes);
  }

  if (mode === Modes.INSERT) {
    if (!focusedNodeID) {
      throw new Error('INSERT mode requires a focused node ID');
    }
    return new KeyMotionHandlerInsert(setNodes, focusedNodeID, initialText || '');
  }

  throw new Error(`Unknown mode: ${mode}`);
}
