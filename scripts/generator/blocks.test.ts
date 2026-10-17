import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadConfig } from './config';
import { generateCollections } from './collections';

test('blocks stay reusable and private, with a homepage record ordering them', async () => {
	const config = await loadConfig();
	const blocks = config.find((entry) => entry.name === 'blocks');
	const homepage = config.find((entry) => entry.name === 'homepage');
	assert.ok(blocks?.folder);
	assert.equal(blocks.public_route, undefined);
	assert.ok(homepage?.files?.some((entry) => entry.name === 'home'));
	const references = homepage?.files?.find((entry) => entry.name === 'home')?.fields?.find((field) => field.name === 'blocks');
	assert.equal(references?.collection, 'blocks');
	assert.equal(references?.multiple, true);
	for (const field of ['type', 'heading', 'introduction', 'collection', 'category', 'tags', 'tagMatch', 'limit', 'items']) {
		assert.ok(blocks.fields?.some((entry) => entry.name === field), field);
	}
	const generated = generateCollections(config);
	assert.match(generated, /"blocks": \{[\s\S]*?"publicRoute": false/);
});
