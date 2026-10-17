<script lang="ts">
	import type { PageData } from './$types';
	import Page from '#lib/templates/Page.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.title}</title></svelte:head>
<Page {data} />
