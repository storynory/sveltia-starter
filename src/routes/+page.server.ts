import { getSettings } from '#lib/server/content.ts';
import { buildBlock } from '#lib/server/blocks.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const home = await getSettings('homepage', 'home');
	const slugs = Array.isArray(home.blocks) ? home.blocks.filter((value): value is string => typeof value === 'string') : [];
	const blocks = (await Promise.all(slugs.map(buildBlock))).filter((block) => block !== null);
	return { title: typeof home.title === 'string' ? home.title : 'Home', blocks };
};
