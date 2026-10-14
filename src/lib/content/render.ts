import { marked } from 'marked';

export async function renderMarkdown(body: string): Promise<string> {
	return await marked.parse(body);
}
