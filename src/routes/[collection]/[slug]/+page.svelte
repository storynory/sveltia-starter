<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.title}</title></svelte:head>
<article>
	<h1>{data.title}</h1>
	{#if data.date}<p><small>{data.date}</small></p>{/if}
	<div class="content">{@html data.html}</div>
</article>
<style>
	article { max-width: 760px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.7; }
</style>
