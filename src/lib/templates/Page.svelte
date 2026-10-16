<script lang="ts">
	import type { DetailTemplateData } from './types';
	import { textField } from './fields.ts';
	let { data }: { data: DetailTemplateData } = $props();
	const html = $derived(textField(data.item, 'html'));
</script>

<main>
	<h1>{data.title}</h1>
	<div class="content">{@html html}</div>
</main>

<style>
	main { max-width: 800px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.7; }
	.content :global(picture) { display: block; max-width: 100%; }
	.content :global(img) { display: block; max-width: 100%; height: auto; }
</style>
