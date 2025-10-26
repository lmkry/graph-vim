import { KeyMotionHandlerFactory} from './keyMotionHandlerFactory';
import type { Node } from '../types';
import type { Modes } from './modes';

export function initKeyMotions(setNodes: (n: Node[]) => void, mode: Modes): () => void {
  const keyMotionHandler = KeyMotionHandlerFactory(setNodes, mode);
  const listener = (e: KeyboardEvent) => {
    keyMotionHandler.handleKeyPress(e.key);
  };
  window.addEventListener('keydown', listener);

  return () => {
    window.removeEventListener('keydown', listener);
  };


}
