// Generated automatically. Do not edit.

export const collections = {
  "authors": {
    "kind": "folder",
    "folder": "content/authors",
    "extension": "yml",
    "format": "yaml"
  },
  "categories": {
    "kind": "folder",
    "folder": "content/categories",
    "extension": "yml",
    "format": "yaml"
  },
  "colour-schemes": {
    "kind": "folder",
    "folder": "content/colour-schemes",
    "extension": "yml",
    "format": "yaml"
  },
  "navigation": {
    "kind": "folder",
    "folder": "content/navigation",
    "extension": "yml",
    "format": "yaml"
  },
  "pages": {
    "kind": "folder",
    "folder": "content/pages",
    "extension": "md",
    "format": "markdown"
  },
  "posts": {
    "kind": "folder",
    "folder": "content/posts",
    "extension": "md",
    "format": "markdown"
  },
  "settings": {
    "kind": "files",
    "files": [
      {
        "name": "general",
        "file": "content/settings/general.yml",
        "format": "yaml"
      }
    ]
  },
  "tags": {
    "kind": "folder",
    "folder": "content/tags",
    "extension": "yml",
    "format": "yaml"
  }
} as const;

export type CollectionName = keyof typeof collections;
