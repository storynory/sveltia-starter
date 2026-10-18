<script lang="ts">
	export type SearchItem = {
		title: string;
		excerpt: string;
		text: string;
		url: string;
		collection: string;
	};

	let { items }: { items: SearchItem[] } = $props();
	let query = $state('');

	const terms = $derived(query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean));
	const results = $derived(
		terms.length
			? items.filter((item) => {
					const haystack = `${item.title} ${item.excerpt} ${item.text}`.toLocaleLowerCase();
					return terms.every((term) => haystack.includes(term));
				})
			: []
	);
</script>

<form role="search" onsubmit={(event) => event.preventDefault()}>
	<label for="site-search">Search the site</label>
	<input id="site-search" type="search" bind:value={query} placeholder="Search stories and pages…" autocomplete="off" />
</form>

{#if terms.length}
	<p aria-live="polite">{results.length} {results.length === 1 ? 'result' : 'results'} found</p>
	<ul>
		{#each results as item (item.url)}
			<li>
				<h2><a href={item.url}>{item.title}</a></h2>
				{#if item.excerpt}<p>{item.excerpt}</p>{/if}
				<small>{item.collection}</small>
			</li>
		{/each}
	</ul>
{/if}

<style>
	form { display: grid; gap: 0.5rem; }
	label { font-weight: bold; }
	input { width: 100%; padding: 0.8rem; border: 1px solid var(--prime); border-radius: var(--radius); font: inherit; background: var(--second); color: var(--text); }
	input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
	ul { list-style: none; padding: 0; }
	li { padding: 1rem 0; border-bottom: 1px solid var(--gray); }
	h2 { margin: 0 0 0.35rem; font-size: 1.2rem; }
	h2 a { color: var(--accent); }
	p { margin: 0.4rem 0; }
	small { opacity: 0.75; }
</style>
