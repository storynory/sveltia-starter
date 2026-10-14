import type { CmsCollection } from './config';

function formatOf(format?: string) {
	switch (format) {
		case 'json':
			return 'json';
		case 'yaml':
		case 'yml':
			return 'yaml';
		default:
			return 'markdown';
	}
}

export function generateCollections(input: CmsCollection[]) {
	const collections: Record<string, unknown> = {};

	for (const item of input) {
		if (item.folder) {
			collections[item.name] = {
				kind: 'folder',
				folder: item.folder,
				extension: item.extension ?? 'md',
				format: formatOf(item.format)
			};
		} else if (item.files) {
			collections[item.name] = {
				kind: 'files',
				files: item.files.map((file) => ({
					name: file.name,
					file: file.file,
					format: formatOf(file.format ?? item.format)
				}))
			};
		}
	}

	return `// Generated automatically. Do not edit.

export const collections = ${JSON.stringify(collections, null, 2)} as const;

export type CollectionName = keyof typeof collections;
`;
}
