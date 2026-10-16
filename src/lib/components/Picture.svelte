<script lang="ts">
	import manifest from '#lib/generated/image-manifest.json';
	import { pictureSources, type ImageManifest } from '#lib/images/picture';

	type Props = {
		src: string;
		alt: string;
		sizes?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
		class?: string;
	};

	let {
		src,
		alt,
		sizes = '100vw',
		loading = 'lazy',
		fetchpriority,
		class: className
	}: Props = $props();

	const image = $derived(pictureSources(src, manifest as ImageManifest));
</script>

<picture>
	{#each image.sources as source (source.type)}
		<source type={source.type} srcset={source.srcset} {sizes} />
	{/each}
	<img
		src={image.fallback}
		{alt}
		{loading}
		{fetchpriority}
		class={className}
		width={image.width}
		height={image.height}
		style="max-width: 100%; height: auto;"
	/>
</picture>
