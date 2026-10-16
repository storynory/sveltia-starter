import fs from 'node:fs/promises';
import { loadConfig } from './config';
import { generateCollections } from './collections';
import { generateTypes } from './types';

async function main() {
	const config = await loadConfig();
	const output = generateCollections(config);

	await fs.mkdir('src/lib/generated', { recursive: true });
	await fs.writeFile('src/lib/generated/collections.ts', output);
	await fs.writeFile('src/lib/generated/types.ts', generateTypes(config));

	console.log(`Generated ${config.length} CMS collections.`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
