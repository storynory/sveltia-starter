import { getAll } from '#lib/server/content.ts';
import { homePageSlug } from '#lib/server/home.ts';
import { publicCollections, published } from '#lib/server/public-routes.ts';
import type { PageServerLoad } from './$types';

function asText(value: unknown): string {
	return typeof value === 'string' ? value : '';
}

export const load: PageServerLoad = async () => {
	const home = await homePageSlug();
	const groups = await Promise.all(
		publicCollections().map(async (collection) => {
			const items = await getAll(collection, (records) =>
				records.filter((record) => published(record.data))
			);

			return items.map((item) => {
				const record = item as unknown as Record<string, unknown>;
				const title = asText(record.title) || asText(record.name) || item.slug;
				const excerpt = asText(record.excerpt) || asText(record.description);
				const text = asText(record.html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
				const url = collection === 'pages' && item.slug === home
					? '/'
					: `/${collection}/${encodeURIComponent(item.slug)}/`;

				return { title, excerpt, text, url, collection };
			});
		})
	);

	return { items: groups.flat() };
};
