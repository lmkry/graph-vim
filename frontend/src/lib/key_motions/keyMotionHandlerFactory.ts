import type { KeyMotionHandlerBase } from './keyMotionHandlerBase';
import { KeyMotionHandlerNormal } from './keyMotionHandlerNormal';
import { Modes } from './modes';
import type { Node } from '../types';

export function KeyMotionHandlerFactory(setNodes: (n: Node[]) => void, mode: Modes): KeyMotionHandlerBase {
  if (mode === Modes.NORMAL) {
    return new KeyMotionHandlerNormal(setNodes);
  }

  throw new Error(`Unknown mode: ${mode}`)
}
