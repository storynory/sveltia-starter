<script lang="ts">
	import type { PageData } from './$types';
	import SiteSearch from '#lib/components/SiteSearch.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Search pages, posts and podcasts." />
</svelte:head>

<main>
	<h1>Search</h1>
	<SiteSearch items={data.items} />
</main>

<style>
	main { max-width: var(--content-width); margin: 3rem auto; padding: 0 var(--space); }
</style>
