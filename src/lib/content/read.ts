import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import YAML from 'yaml';
import { collections, type CollectionName } from '#lib/generated/collections.ts';

const ROOT = path.resolve(process.cwd());

export type ReadResult = {
	meta: {
		collection: string;
		slug?: string;
		name?: string;
		sourcePath: string;
	};
	data: Record<string, unknown>;
	body: string;
};

function fileSlug(filename: string) {
	return filename.replace(/\.[^.]+$/, '');
}

function parseContent(raw: string, format: string) {
	if (format === 'yaml' || format === 'json') {
		const data = format === 'yaml' ? YAML.parse(raw) : JSON.parse(raw);

		return {
			data: data ?? {},
			body: typeof data?.body === 'string' ? data.body : ''
		};
	}

	const parsed = matter(raw);

	return {
		data: parsed.data as Record<string, unknown>,
		body: parsed.content
	};
}

export async function readAll(name: CollectionName): Promise<ReadResult[]> {
	const def = collections[name];

	if (def.kind !== 'folder') {
		throw new Error(`"${name}" is not a folder collection.`);
	}

	const dir = path.join(ROOT, def.folder);
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const results: ReadResult[] = [];

	for (const entry of entries) {
		if (!entry.isFile()) continue;
		if (!entry.name.endsWith(`.${def.extension}`)) continue;

		const fullPath = path.join(dir, entry.name);
		const raw = await fs.readFile(fullPath, 'utf8');
		const content = parseContent(raw, def.format);

		results.push({
			meta: {
				collection: name,
				slug: fileSlug(entry.name),
				sourcePath: fullPath
			},
			...content
		});
	}

	return results;
}

export async function readOne(name: CollectionName, slug: string): Promise<ReadResult | null> {
	const def = collections[name];

	if (def.kind !== 'folder') {
		throw new Error(`"${name}" is not a folder collection.`);
	}

	if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return null;

	const fullPath = path.join(ROOT, def.folder, `${slug}.${def.extension}`);

	let raw: string;
	try {
		raw = await fs.readFile(fullPath, 'utf8');
	} catch (err) {
		if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
		throw err;
	}

	return {
		meta: { collection: name, slug, sourcePath: fullPath },
		...parseContent(raw, def.format)
	};
}

export async function readDoc(name: CollectionName, docName: string): Promise<ReadResult> {
	const def = collections[name];

	if (def.kind !== 'files') {
		throw new Error(`"${name}" is not a files collection.`);
	}

	const item = def.files.find((file) => file.name === docName);

	if (!item) {
		throw new Error(`Document "${docName}" not found in "${name}".`);
	}

	const fullPath = path.join(ROOT, item.file);
	const raw = await fs.readFile(fullPath, 'utf8');

	return {
		meta: {
			collection: name,
			name: docName,
			sourcePath: fullPath
		},
		...parseContent(raw, item.format)
	};
}
