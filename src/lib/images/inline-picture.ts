import { pictureSources, type ImageManifest } from './picture.ts';

function escapeAttribute(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Render Markdown images using the same manifest as Picture.svelte. */
export function inlinePicture(
	src: string,
	alt: string,
	title: string | null | undefined,
	manifest: ImageManifest
): string {
	const image = pictureSources(src, manifest);
	const attrs = [
		`src="${escapeAttribute(image.fallback)}"`,
		`alt="${escapeAttribute(alt)}"`,
		'title="' + escapeAttribute(title ?? '') + '"'
	];
	if (!title) attrs.pop();
	if (image.width) attrs.push(`width="${image.width}"`);
	if (image.height) attrs.push(`height="${image.height}"`);
	attrs.push('loading="lazy"', 'decoding="async"');
	const img = `<img ${attrs.join(' ')}>`;
	if (!image.sources.length) return img;
	const sizes = '(min-width: 800px) 800px, 100vw';
	const sources = image.sources.map((source) =>
		`<source type="${source.type}" srcset="${escapeAttribute(source.srcset)}" sizes="${sizes}">`
	).join('');
	return `<picture>${sources}${img}</picture>`;
}
