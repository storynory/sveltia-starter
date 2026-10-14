import { error } from '@sveltejs/kit';
import { readOne } from '#lib/content/read.ts';
import { renderMarkdown } from '#lib/content/render.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await readOne('posts', params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		title: String(post.data.title ?? params.slug),
		date: post.data.date ? String(post.data.date) : '',
		html: await renderMarkdown(post.body)
	};
};
