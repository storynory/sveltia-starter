import { json } from '@sveltejs/kit';
import { getAll } from '#lib/server/content.ts';
import { homePageSlug } from '#lib/server/home.ts';
import { publicCollections, published } from '#lib/server/public-routes.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

type Data = Record<string, unknown>;
const asText = (value: unknown): string => typeof value === 'string' ? value : '';

function relationNames(value: unknown): string[] {
	const values = Array.isArray(value) ? value : value ? [value] : [];
	return values.flatMap((related) => {
		if (!related || typeof related !== 'object') return [];
		const record = related as Data;
		const name = asText(record.title) || asText(record.name) || asText(record.slug);
		return name ? [name] : [];
	});
}

export const GET: RequestHandler = async () => {
	const home = await homePageSlug();
	const groups = await Promise.all(publicCollections().map(async (collection) => {
		const items = await getAll(collection, (records) =>
			records.filter((record) => published(record.data))
		);
		return items.map((item) => {
			const record = item as unknown as Data;
			return {
				title: asText(record.title) || asText(record.name) || item.slug,
				excerpt: asText(record.excerpt) || asText(record.description),
				text: asText(record.html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
				url: collection === 'pages' && item.slug === home
					? '/'
					: `/${collection}/${encodeURIComponent(item.slug)}/`,
				collection,
				categories: relationNames(record.category),
				tags: relationNames(record.tags)
			};
		});
	}));
	return json(groups.flat());
};
