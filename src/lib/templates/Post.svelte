<script lang="ts">
	import type { DetailTemplateData } from './types';
	import Picture from '$lib/components/Picture.svelte';
	let { data }: { data: DetailTemplateData } = $props();
</script>

<article>
	<header>
		<h1>{data.title}</h1>
		<div class="meta">
			{#if data.date}<time>{data.date}</time>{/if}
			{#if data.author}<span>By {data.author}</span>{/if}
			{#if data.categoryLabel}<span>{data.categoryLabel}</span>{/if}
		</div>
	</header>
	{#if data.featuredImage}
		<Picture src={data.featuredImage} alt={data.featuredImageAlt || data.title} sizes="(min-width: 760px) 760px, 100vw" />
	{/if}
	<div class="content">{@html data.html}</div>
	{#if data.tags.length}
		<footer>{#each data.tags as tag}<span class="tag">{tag}</span>{/each}</footer>
	{/if}
</article>

<style>
	article { max-width: 760px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.7; }
	h1 { font-size: 2.5rem; line-height: 1.2; }
	.meta { display: flex; flex-wrap: wrap; gap: 1rem; color: #666; margin-bottom: 2rem; }
	picture { display: block; max-width: 100%; }
	footer { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 2rem; }
	.tag { background: #eee; border-radius: 1rem; padding: .25rem .75rem; }
</style>
