<script lang="ts">
	import type { PageData } from './$types';
	import Post from '#lib/templates/Post.svelte';
	import Page from '#lib/templates/Page.svelte';
	import Default from '#lib/templates/Default.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.title}</title></svelte:head>
{#if data.collection === 'posts'}
	<Post {data} />
{:else if data.collection === 'pages'}
	<Page {data} />
{:else}
	<Default {data} />
{/if}
