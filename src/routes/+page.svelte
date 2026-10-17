<script lang="ts">
	import type { PageData } from './$types';
	import ContentBlock from '#lib/blocks/ContentBlock.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.title}</title></svelte:head>
<main>
	<h1>{data.title}</h1>
	{#each data.blocks as block (block.slug)}
		<ContentBlock {block} />
	{/each}
</main>
<style>main { max-width: 1000px; margin: 3rem auto; padding: 0 1.5rem; }</style>
