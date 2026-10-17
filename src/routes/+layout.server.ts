import { getSettings } from '#lib/server/content.ts';
import type { LayoutServerLoad } from './$types';

const defaults = {
	prime: '#e3d2b7',
	accent: '#00634e',
	second: '#f4e8d7',
	gray: '#f8f9fa',
	text: '#333333'
};

// Sveltia's colour widget supplies hex colours. Ignore missing or malformed values.
const colour = (value: unknown, fallback: string) =>
	typeof value === 'string' && /^#[\da-fA-F]{3}([\da-fA-F]{3})?$/.test(value)
		? value
		: fallback;

export const load: LayoutServerLoad = async () => {
	const settings = await getSettings('settings', 'general');
	const scheme = settings.activeScheme && typeof settings.activeScheme === 'object'
		? settings.activeScheme as Record<string, unknown>
		: {};
	return {
		colours: {
			prime: colour(scheme.prime, defaults.prime),
			accent: colour(scheme.accent, defaults.accent),
			second: colour(scheme.second, defaults.second),
			gray: colour(scheme.gray, defaults.gray),
			text: colour(scheme.text, defaults.text)
		}
	};
};
