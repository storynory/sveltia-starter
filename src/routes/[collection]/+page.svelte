<script lang="ts">
	import type { PageData } from './$types';
	import { listTemplates } from '#lib/generated/list-templates.ts';

	let { data }: { data: PageData } = $props();
	const selected = $derived(data.listTemplate as keyof typeof listTemplates);
	const Template = $derived(listTemplates[selected] ?? listTemplates.default);
</script>

<svelte:head>
	<title>{data.collection}</title>
</svelte:head>

<Template {data} />
