import { getOne } from '#lib/server/content.ts';
import { readDoc } from '#lib/content/read.ts';
import type { LayoutServerLoad } from './$types';

const defaults = {
	prime: '#e3d2b7',
	accent: '#00634e',
	second: '#f4e8d7',
	gray: '#f8f9fa',
	text: '#333333'
};

// Sveltia's colour widget supplies hex colours.
const colour = (value: unknown, fallback: string) =>
	typeof value === 'string' && /^#[\da-fA-F]{3}([\da-fA-F]{3})?$/.test(value)
		? value
		: fallback;

export const load: LayoutServerLoad = async () => {
	// Read the configured slug directly, then load that colour scheme.
	const settings = (await readDoc('settings', 'general')).data;
	const slug = typeof settings.activeScheme === 'string' && settings.activeScheme
		? settings.activeScheme : 'default';
	const scheme = await getOne('colour-schemes', slug);
	if (!scheme) throw new Error(`Colour scheme "${slug}" was not found in content/colour-schemes`);

	return {
		siteName: typeof settings.siteName === 'string' ? settings.siteName : '',
		siteLogo: typeof settings.siteLogo === 'string' ? settings.siteLogo : '',
		navigation: (await getOne('navigation', 'main-menu'))?.items ?? [],
		colours: {
			prime: colour(scheme.prime, defaults.prime),
			accent: colour(scheme.accent, defaults.accent),
			second: colour(scheme.second, defaults.second),
			gray: colour(scheme.gray, defaults.gray),
			text: colour(scheme.text, defaults.text)
		}
	};
};
