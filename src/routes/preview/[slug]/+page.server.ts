import { error } from '@sveltejs/kit';
import { readOne } from '#lib/content/read.ts';
import { renderMarkdown } from '#lib/content/render.ts';
import { resolveRelations } from '#lib/content/relations.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await readOne('posts', params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	// Resolve all relationships automatically
	const related = await resolveRelations('posts', post.data);

	const author = related.author;
	const category = related.category;
	const tags = related.tags;

	const authorData = author && !Array.isArray(author) ? author : null;
	const categoryData = category && !Array.isArray(category) ? category : null;

	return {
		title: String(post.data.title ?? params.slug),
		date: post.data.date ? String(post.data.date) : '',

		author: String(authorData?.name ?? ''),
		category: String(categoryData?.title ?? ''),

		tags: Array.isArray(tags)
			? tags.filter((tag) => tag !== null).map((tag) => String(tag.title ?? ''))
			: [],

		html: await renderMarkdown(post.body)
	};
};
