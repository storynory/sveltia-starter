import assert from 'node:assert/strict';
import { test } from 'node:test';
import { generateCollections } from './collections';

test('only explicitly opted-in folder collections have public routes', () => {
	const output = generateCollections([
		{ name: 'posts', folder: 'content/posts', public_route: true },
		{ name: 'navigation', folder: 'content/navigation' },
		{ name: 'settings', files: [{ name: 'general', file: 'content/settings/general.yml' }] }
	]);
	assert.match(output, /"posts": \{[\s\S]*?"publicRoute": true/);
	assert.match(output, /"navigation": \{[\s\S]*?"publicRoute": false/);
	assert.doesNotMatch(output, /"settings": \{[\s\S]*?"publicRoute": true/);
});
