<script lang="ts">
  import { onMount } from 'svelte';
  import type { Node } from './lib/types';
  import { handleGetNodes, handleAddNode, handleDeleteNode } from './lib/graphActions';

  let nodes: Node[] = [];
  const setNodes = (n: Node[]) => {
    nodes = n;
  };

  onMount(() => handleGetNodes(setNodes));
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
