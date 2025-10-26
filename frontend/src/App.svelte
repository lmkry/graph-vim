<script lang="ts">
  import { onMount } from 'svelte';
  import type { Node } from './lib/types';
  import { Modes } from './lib/key_motions/modes';
  import { handleGetNodes, handleAddNode, handleDeleteNode } from './lib/graphActions';
  import { KeyMotionHandlerFactory } from './lib/key_motions/keyMotionHandlerFactory';
  import { initKeyMotions } from './lib/key_motions/keyMotions';

  let nodes: Node[] = [];
  const setNodes = (n: Node[]) => {
    nodes = n;
  };

  onMount(() => {
    handleGetNodes(setNodes);
    const cleanupKeyMotions = initKeyMotions(setNodes, Modes.NORMAL);
    return () => {
      cleanupKeyMotions();
    };
  });
</script>

<main>
  <button on:click={() => handleAddNode(setNodes)}> Add Node </button>
  <button on:click={() => handleDeleteNode(setNodes)}> Delete Node</button>
  <svg width="100%" height="500">
    {#each nodes as node}
      <circle cx={node.X} cy={node.Y} r="10" fill="lightblue"/>
    {/each}
  </svg>

</main>

<style>
  svg {
    border: 1px solid #fff;
  }
</style>
