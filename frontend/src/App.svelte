<script lang="ts">
  import { onMount } from 'svelte';
  import { GetNodes, AddNode, DeleteNode } from '../wailsjs/go/app/App';

  interface Node {
    X: number;
    Y: number;
  }

  let nodes: Node[] = [];

  async function loadNodes() {
    nodes = await GetNodes();
  }

  async function addNode() {
    nodes = await AddNode();
  }

  async function deleteNode() {
    nodes = await DeleteNode();
  }

  onMount(loadNodes);
</script>

<main>
  <button on:click={addNode}> Add Node</button>
  <button on:click={deleteNode}> Delete Node</button>
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
