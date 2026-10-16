<script lang="ts">
	import manifest from '#lib/generated/image-manifest.json';
	import { pictureSources, type ImageManifest } from '#lib/images/picture.ts';

	type Props = {
		src: string;
		alt: string;
		sizes?: string;
		loading?: 'lazy' | 'eager';
		priority?: 'high' | 'auto';
		fetchpriority?: 'high' | 'low' | 'auto';
		class?: string;
	};

	let {
		src,
		alt,
		sizes = '100vw',
		loading,
		priority = 'auto',
		fetchpriority,
		class: className
	}: Props = $props();

	const image = $derived(pictureSources(src, manifest as ImageManifest));
	const imageLoading = $derived(loading ?? (priority === 'high' ? 'eager' : 'lazy'));
	const imagePriority = $derived(fetchpriority ?? (priority === 'high' ? 'high' : undefined));
</script>

<picture>
	{#each image.sources as source (source.type)}
		<source type={source.type} srcset={source.srcset} {sizes} />
	{/each}
	<img
		src={image.fallback}
		{alt}
		loading={imageLoading}
		fetchpriority={imagePriority}
		class={className}
		width={image.width}
		height={image.height}
		style="max-width: 100%; height: auto;"
	/>
</picture>
