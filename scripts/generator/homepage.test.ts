import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import YAML from 'yaml';
import matter from 'gray-matter';
import { loadConfig } from './config';

test('homepage is an ordinary Page selected in Site Settings', async () => {
	const config = await loadConfig();
	assert.ok(!config.some((entry) => entry.name === 'homepage'));
	const settings = config.find((entry) => entry.name === 'settings');
	const general = settings?.files?.find((entry) => entry.name === 'general');
	const selector = general?.fields?.find((field) => field.name === 'homePage');
	assert.equal(selector?.collection, 'pages');
	const values = YAML.parse(await fs.readFile('content/settings/general.yml', 'utf8'));
	assert.equal(values.homePage, 'home');
	const page = matter(await fs.readFile('content/pages/home.md', 'utf8'));
	assert.equal(page.data.title, 'Home');
	assert.deepEqual(page.data.blocks, ['welcome-hero', 'latest-stories']);
});
