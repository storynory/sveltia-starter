/** Every public collection is passed as an intact record.
 * Individual templates interpret the fields required by their own content type.
 */
export type DetailTemplateData = {
	title: string;
	collection: string;
	template: string;
	item: Record<string, unknown>;
};
