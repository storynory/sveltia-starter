<script lang="ts">
	import type { PageData } from './$types';
	import { templates } from '#lib/generated/templates.ts';

	let { data }: { data: PageData } = $props();
	const selected = $derived(data.template as keyof typeof templates);
	const Template = $derived(templates[selected] ?? templates.default);
</script>

<svelte:head><title>{data.title}</title></svelte:head>
<Template {data} />
