import { getAll } from '#lib/server/content.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allPosts = await getAll('posts');

	const posts = allPosts
		.filter((post) => post.draft !== true)
		.sort((a, b) => {
			const dateA = new Date(String(a.date ?? 0)).getTime();
			const dateB = new Date(String(b.date ?? 0)).getTime();

			return dateB - dateA;
		});

	return { posts };
};
