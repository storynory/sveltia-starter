<script lang="ts">
	import type { DetailTemplateData } from './types';
	let { data }: { data: DetailTemplateData } = $props();
</script>

<article>
	<h1>{data.title}</h1>
	<div class="content">{@html data.html}</div>
</article>

<style>
	article { max-width: 760px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.7; }
</style>
