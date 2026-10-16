import { error } from '@sveltejs/kit';
import { getOne } from '#lib/server/content.ts';
import { publicCollection, publicEntries, published } from '#lib/server/public-routes.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = publicEntries;

export const load: PageServerLoad = async ({ params }) => {
	const collection = publicCollection(params.collection);
	if (!collection) error(404, 'Collection not found');
	const item = await getOne(collection, params.slug);
	if (!item || !published(item as unknown as Record<string, unknown>)) {
		error(404, 'Content not found');
	}
	const data = item as unknown as Record<string, unknown>;
	const author = data.author;
	const category = data.category;
	const tags = data.tags;
	const relatedLabel = (value: unknown, property: string): string =>
		value && typeof value === 'object' && !Array.isArray(value)
			? String((value as Record<string, unknown>)[property] ?? '')
			: '';

	return {
		title: String(data.title ?? data.name ?? params.slug),
		html: item.html,
		date: String(data.date ?? ''),
		collection,
		author: relatedLabel(author, 'name'),
		categoryLabel: relatedLabel(category, 'title'),
		tags: Array.isArray(tags)
			? tags.map((tag) => relatedLabel(tag, 'title')).filter(Boolean)
			: [],
		featuredImage: typeof data.featuredImage === 'string' ? data.featuredImage : '',
		featuredImageAlt: typeof data.featuredImageAlt === 'string' ? data.featuredImageAlt : ''
	};
};
