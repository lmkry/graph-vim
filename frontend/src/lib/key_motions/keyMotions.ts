import { KeyMotionHandlerFactory} from './keyMotionHandlerFactory';
import type { Node } from '../types';
import type { Modes } from './modes';

export function initKeyMotions(
  setNodes: (n: Node[]) => void,
  mode: Modes,
  focusedNodeID?: string,
  initialText?: string
): () => void {
  const keyMotionHandler = KeyMotionHandlerFactory(
    setNodes,
    mode,
    focusedNodeID,
    initialText
  );

  const listener = (e: KeyboardEvent) => {
    keyMotionHandler.handleKeyPress(e.key);
  };

  window.addEventListener('keydown', listener);

  return () => {
    window.removeEventListener('keydown', listener);
  };
}
