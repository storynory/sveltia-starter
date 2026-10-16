<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.collection}</title>
</svelte:head>

<main>
	<h1>{data.collection}</h1>
	{#if !data.items.length}
		<p>No published content yet.</p>
	{:else}
		{#each data.items as item}
			<article>
				<h2><a href={`/${data.collection}/${item.slug}/`}>{item.title}</a></h2>
				{#if item.excerpt}<p>{item.excerpt}</p>{/if}
				{#if item.date}<small>{item.date}</small>{/if}
			</article>
		{/each}
	{/if}
</main>

<style>
	main { max-width: 900px; margin: 4rem auto; padding: 0 1.5rem; }
	article { padding-bottom: 1.5rem; margin-bottom: 2rem; border-bottom: 1px solid #ddd; }
	a { color: inherit; }
</style>
