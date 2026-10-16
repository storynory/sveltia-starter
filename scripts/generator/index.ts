import fs from 'node:fs/promises';
import path from 'node:path';
import { loadConfig } from './config';
import { generateCollections } from './collections';
import { generateTypes } from './types';
import { generateAdminIndex } from './admin-index';

async function main() {
	const config = await loadConfig();
	const collectionFiles = await fs.readdir('static/admin/collections');
	const indexPath = 'static/admin/index.html';
	const indexHtml = await fs.readFile(indexPath, 'utf8');
	const generatedIndex = generateAdminIndex(indexHtml, collectionFiles);
	if (generatedIndex !== indexHtml) await fs.writeFile(indexPath, generatedIndex);
	const output = generateCollections(config);
	const templateDir = 'src/lib/templates';
	const available = (await fs.readdir(templateDir))
		.filter((file) => /^[A-Za-z][A-Za-z0-9]*\.svelte$/.test(file))
		.map((file) => path.basename(file, '.svelte'));
	const names = new Map<string, string>();
	for (const name of available) {
		const key = name.toLowerCase();
		if (names.has(key)) throw new Error(`Duplicate template name: ${name}`);
		names.set(key, name);
	}
	if (!names.has('default')) throw new Error('Missing Default.svelte template');
	for (const collection of config) {
		if (!collection.folder || collection.public_route !== true) continue;
		const template = collection.template ?? 'default';
		if (!names.has(template)) {
			throw new Error(`Unknown template "${template}" for collection "${collection.name}". Available templates: ${[...names.keys()].join(', ')}`);
		}
	}
	const imports = [...names].map(([key, filename], i) =>
		`import Template${i} from '../templates/${filename}.svelte';`
	).join('\n');
	const mappings = [...names].map(([key], i) => `  ${JSON.stringify(key)}: Template${i}`).join(',\n');
	const registry = `// Generated automatically. Do not edit.\n${imports}\nexport const templates = {\n${mappings}\n};\n`;

	await fs.mkdir('src/lib/generated', { recursive: true });
	await fs.writeFile('src/lib/generated/collections.ts', output);
	await fs.writeFile('src/lib/generated/types.ts', generateTypes(config));
	await fs.writeFile('src/lib/generated/templates.ts', registry);

	console.log(`Generated ${config.length} CMS collections.`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
