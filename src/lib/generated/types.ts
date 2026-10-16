// Generated automatically from Sveltia collection YAML. Do not edit.

export type AuthorsContent = {
	"name": string;
	"bio"?: string;
	"photo"?: string;
	"website"?: string;
};

export type CategoriesContent = {
	"title": string;
	"description"?: string;
	"image"?: string;
	"parent"?: string;
	"seo"?: {
		"title"?: string;
		"description"?: string;
	};
};

export type ColourSchemesContent = {
	"title": string;
	"prime": string;
	"accent": string;
	"second": string;
	"gray": string;
	"text": string;
};

export type NavigationContent = {
	"title": string;
	"items"?: {
		"label": string;
		"url"?: string;
		"newTab": boolean;
		"children"?: {
			"label": string;
			"url": string;
			"newTab": boolean;
		}[];
	}[];
};

export type PagesContent = {
	"title": string;
	"body": string;
};

export type PostsContent = {
	"title": string;
	"body": string;
	"excerpt"?: string;
	"date": string;
	"author"?: string;
	"draft": boolean;
	"category"?: string;
	"tags"?: string[];
	"showOnHome"?: boolean;
	"featured"?: boolean;
	"featuredImage"?: string;
	"featuredImageAlt"?: string;
	"seo"?: {
		"title"?: string;
		"description"?: string;
	};
};

export type SettingsGeneralContent = {
	"siteName": string;
	"tagline"?: string;
	"siteUrl"?: string;
	"description"?: string;
	"siteLogo"?: string;
	"favicon"?: string;
	"defaultImage"?: string;
	"language": string;
	"activeScheme"?: string;
	"social"?: {
		"facebook"?: string;
		"instagram"?: string;
		"youtube"?: string;
		"linkedin"?: string;
		"x"?: string;
	};
	"footer"?: {
		"copyright"?: string;
		"description"?: string;
	};
};

export type StoriesContent = {
	"title": string;
	"body": string;
	"excerpt"?: string;
	"date": string;
	"author"?: string;
	"draft": boolean;
	"category"?: string;
	"tags"?: string[];
	"showOnHome"?: boolean;
	"featured"?: boolean;
	"featuredImage"?: string;
	"featuredImageAlt"?: string;
	"seo"?: {
		"description"?: string;
	};
};

export type TagsContent = {
	"title": string;
	"description"?: string;
	"image"?: string;
	"seo"?: {
		"title"?: string;
		"description"?: string;
	};
};

export type ContentByCollection = {
	"authors": AuthorsContent;
	"categories": CategoriesContent;
	"colour-schemes": ColourSchemesContent;
	"navigation": NavigationContent;
	"pages": PagesContent;
	"posts": PostsContent;
	"settings": {
		"general": SettingsGeneralContent;
	};
	"stories": StoriesContent;
	"tags": TagsContent;
};
