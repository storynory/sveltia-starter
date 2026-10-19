import { standardFeed } from '#lib/server/feed-handlers.ts';
import type { RequestHandler } from './$types';

export const prerender = true;
export const GET: RequestHandler = ({ url }) => standardFeed('posts', url.origin);
