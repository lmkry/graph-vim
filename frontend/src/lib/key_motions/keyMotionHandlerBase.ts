import { eventBus } from '../events/eventBus';

export type Action = () => void;

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  action?: Action;
}

export abstract class KeyMotionHandlerBase {
  protected root = new TrieNode();
  protected currentBuffer: TrieNode[] = [this.root];
  protected eventBus = eventBus; // Accessible to subclasses

  constructor() {
    this.defineKeyMotions();
  }

  protected abstract defineKeyMotions(): void;

  protected addKeyMotion(keyMotion: string, action: Action) {
    let node = this.root;
    for(const key of keyMotion) {
      if (!node.children.has(key)) {
        node.children.set(key, new TrieNode());
      }
      node = node.children.get(key)!;
    }
    node.action = action;
  }

  handleKeyPress(key: string): void {
    const nextBuffer: TrieNode[] = [];

    for (const node of this.currentBuffer) {
      if (node.children.has(key)) {
        const child = node.children.get(key)!;
        nextBuffer.push(child);
        if (child.action) {
          this.executeKeyMotion(child.action);
          return;
        }
      }
    }

    if (nextBuffer.length > 0) {
      this.currentBuffer = nextBuffer;
      return;
    }
    this.currentBuffer= [this.root];
  }

  private executeKeyMotion(action: Action): void {
    action();
    this.currentBuffer = [this.root];
  }
}
