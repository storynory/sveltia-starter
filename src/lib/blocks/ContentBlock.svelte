<script lang="ts">
	import type { RenderedBlock } from '#lib/server/blocks.ts';
	import Picture from '#lib/components/Picture.svelte';
	let { block }: { block: RenderedBlock } = $props();
</script>

<section aria-label={block.heading}>
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#if block.introduction}<p class="intro">{block.introduction}</p>{/if}
	{#if block.items.length}
		<div class="cards">
			{#each block.items as item (`${item.collection}/${item.slug}`)}
				<article>
					{#if item.image}
						<a href={`/${item.collection}/${encodeURIComponent(item.slug)}/`}>
							<Picture src={item.image} alt={item.title} sizes="(min-width: 900px) 280px, 100vw" />
						</a>
					{/if}
					<h3><a href={`/${item.collection}/${encodeURIComponent(item.slug)}/`}>{item.title}</a></h3>
					{#if item.excerpt}<p>{item.excerpt}</p>{/if}
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	section { margin: 2.5rem 0; }
	h2 { font-size: 2rem; }
	.intro { margin-bottom: 1.5rem; }
	.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 1.5rem; }
	article { min-width: 0; }
	article :global(img) { max-width: 100%; height: auto; }
	article :global(picture) { display: block; }
	a { color: inherit; }
</style>
