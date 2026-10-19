import { collections } from '#lib/generated/collections.ts';
import { renderMarkdown } from '#lib/content/render.ts';
import { absoluteUrl, channelHeader, feedData, feedResponse, itemBase, xml } from '#lib/server/rss.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	if (collections.posts.rss !== 'standard') return new Response('Feed disabled', { status: 404 });
	const { settings, base, records } = await feedData('posts', url.origin);
	const options = settings.rss as { enabled?: boolean; limit?: number; content?: string } | null;
	if (options?.enabled === false) return new Response('RSS disabled', { status: 404 });
	const limit = Number.isInteger(options?.limit) && (options?.limit ?? 0) > 0 ? options!.limit! : 20;
	const title = String(settings.siteName ?? 'Website');
	const description = String(settings.description ?? settings.tagline ?? '');
	const language = String(settings.language ?? 'en-GB');
	const items = await Promise.all(records.slice(0, limit).map(async ({ meta, data, body }) => {
		const link = absoluteUrl(`/posts/${encodeURIComponent(meta.slug!)}/`, base);
		const description = typeof data.excerpt === 'string' && data.excerpt.trim()
			? data.excerpt : typeof data.description === 'string' ? data.description : '';
		const contents = itemBase(data.title, link, data.date, description);
		if (options?.content === 'full') {
			contents.push(`<content:encoded><![CDATA[${(await renderMarkdown(body)).replaceAll(']]>', ']]]]><![CDATA[>')}]]></content:encoded>`);
		}
		return `<item>${contents.join('')}</item>`;
	}));
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>${channelHeader(title, absoluteUrl('/', base), description, language).join('')}
${items.join('\n')}
</channel></rss>`;
	return feedResponse(body);
};
