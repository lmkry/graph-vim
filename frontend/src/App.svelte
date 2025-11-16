<script lang="ts">
  import { onMount } from 'svelte';
  import type { Node } from './lib/types';
  import { Modes } from './lib/key_motions/modes';
  import { handleGetNodes } from './lib/graphActions';
  import { initKeyMotions } from './lib/key_motions/keyMotions';

  let nodes: Node[] = [];
  const setNodes = (n: Node[]) => {
    nodes = n;
  };

  let currentMode: Modes = Modes.NORMAL;
  let focusedNodeID: string | null = null;
  let keyMotionCleanup: (() => void) | null = null;

  function initializeKeyHandler() {
    if (keyMotionCleanup) {
      keyMotionCleanup();
    }

    const initialText = focusedNodeID ? nodes.find(n => n.ID === focusedNodeID)?.Text : undefined;

    keyMotionCleanup = initKeyMotions(
      setNodes,
      currentMode,
      onEnterInsertMode,
      onExitInsertMode,
      focusedNodeID || undefined,
      initialText
    );
  }

  function onEnterInsertMode(nodeID: string) {
    focusedNodeID = nodeID;
    currentMode = Modes.INSERT;
    initializeKeyHandler();
  }

  function onExitInsertMode() {
    currentMode = Modes.NORMAL;
    focusedNodeID = null;
    initializeKeyHandler();
  }

  onMount(() => {
    handleGetNodes(setNodes);
    initializeKeyHandler();

    return () => {
      if (keyMotionCleanup) {
        keyMotionCleanup();
      }
    };
  });
</script>

<main>
  <svg width="100%" height="500">
    {#each nodes as node}
      {@const text = node.Text || ""}
      {@const radius = Math.max(20, text.length * 5 + 10)}
      {@const isFocused = node.ID === focusedNodeID}

      <circle
        cx={node.X}
        cy={node.Y}
        r={radius}
        fill={isFocused ? "lightgreen" : "lightblue"}
        stroke={isFocused ? "green" : "none"}
        stroke-width="2"
      />
      <text
        x={node.X}
        y={node.Y}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="12"
        fill="black"
      >
        {text}
      </text>
    {/each}
  </svg>

  <!-- Status bar -->
  <div class="status-bar">
    Mode: {currentMode.toUpperCase()}
    {#if focusedNodeID}
      | Focused: {focusedNodeID}
    {/if}
  </div>

</main>

<style>
  svg {
    border: 1px solid #fff;
  }

  .status-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #333;
    color: #fff;
    padding: 8px 16px;
    font-family: monospace;
    font-size: 14px;
  }
</style>
