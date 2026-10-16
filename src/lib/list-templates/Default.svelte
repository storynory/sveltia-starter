<script lang="ts">
	import type { ListingData } from './types.ts';
	import { textField } from '#lib/templates/fields.ts';

	let { data }: { data: ListingData } = $props();
	// Default presentation retains newest-first ordering when dates are present.
	const sorted = $derived([...data.items].sort((a, b) =>
		textField(b, 'date').localeCompare(textField(a, 'date'))
	));
</script>

<main>
	<h1>{data.collection}</h1>
	{#if !sorted.length}
		<p>No published content yet.</p>
	{:else}
		{#each sorted as item (String(item.slug))}
			<article>
				<h2><a href={`/${data.collection}/${encodeURIComponent(String(item.slug))}/`}>{textField(item, 'title') || textField(item, 'name') || String(item.slug)}</a></h2>
				{#if textField(item, 'excerpt')}<p>{textField(item, 'excerpt')}</p>{/if}
				{#if textField(item, 'date')}<small>{textField(item, 'date')}</small>{/if}
			</article>
		{/each}
	{/if}
</main>

<style>
	main { max-width: 900px; margin: 4rem auto; padding: 0 1.5rem; }
	article { padding-bottom: 1.5rem; margin-bottom: 2rem; border-bottom: 1px solid #ddd; }
	a { color: inherit; }
</style>
