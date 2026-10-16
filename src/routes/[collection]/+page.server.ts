import { error } from '@sveltejs/kit';
import { getAll } from '#lib/server/content.ts';
import { publicCollection, publicCollections, published } from '#lib/server/public-routes.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => publicCollections().map((collection) => ({ collection }));

export const load: PageServerLoad = async ({ params }) => {
	const collection = publicCollection(params.collection);
	if (!collection) error(404, 'Collection not found');
	const records = await getAll(collection);
	const items = records
		.filter((record) => published(record as unknown as Record<string, unknown>))
		.map((record) => ({
			slug: record.slug,
			title: String('title' in record ? record.title : 'name' in record ? record.name : record.slug),
			excerpt: 'excerpt' in record ? String(record.excerpt ?? '') : '',
			date: 'date' in record ? String(record.date ?? '') : ''
		}))
		.sort((a, b) => b.date.localeCompare(a.date));
	return { collection, items };
};
