import { readAll, readOne, readDoc, type ReadResult } from '#lib/content/read.ts';
import { resolveRelations } from '#lib/content/relations.ts';
import { renderMarkdown } from '#lib/content/render.ts';
import type { CollectionName } from '#lib/generated/collections.ts';

// Generic content returned to SvelteKit pages.
export type ContentItem = {
	[key: string]: unknown;
	slug?: string;
	html: string;
};

// Prepare content and resolve its relationships.
async function prepare(collection: CollectionName, record: ReadResult): Promise<ContentItem> {
	const related = await resolveRelations(collection, record.data);

	return {
		...record.data,
		...related,
		slug: record.meta.slug,
		html: await renderMarkdown(record.body)
	};
}

// Get one item.
export async function getOne(
	collection: CollectionName,
	slug: string
): Promise<ContentItem | null> {
	const record = await readOne(collection, slug);

	if (!record) return null;

	return prepare(collection, record);
}

// Get all items.
export async function getAll(collection: CollectionName): Promise<ContentItem[]> {
	const records = await readAll(collection);

	return Promise.all(records.map((record) => prepare(collection, record)));
}

// Get a settings document.
export async function getSettings(
	collection: CollectionName = 'settings',
	document = 'general'
): Promise<Record<string, unknown>> {
	const record = await readDoc(collection, document);
	const related = await resolveRelations(collection, record.data);

	return {
		...record.data,
		...related
	};
}
