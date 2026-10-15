// Generated automatically. Do not edit.

export const collections = {
  "authors": {
    "kind": "folder",
    "folder": "content/authors",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "categories": {
    "kind": "folder",
    "folder": "content/categories",
    "extension": "yml",
    "format": "yaml",
    "relations": {
      "parent": {
        "collection": "categories",
        "multiple": false,
        "valueField": "{{slug}}"
      }
    }
  },
  "colour-schemes": {
    "kind": "folder",
    "folder": "content/colour-schemes",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "navigation": {
    "kind": "folder",
    "folder": "content/navigation",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "pages": {
    "kind": "folder",
    "folder": "content/pages",
    "extension": "md",
    "format": "markdown",
    "relations": {}
  },
  "posts": {
    "kind": "folder",
    "folder": "content/posts",
    "extension": "md",
    "format": "markdown",
    "relations": {
      "author": {
        "collection": "authors",
        "multiple": false,
        "valueField": "{{slug}}"
      },
      "category": {
        "collection": "categories",
        "multiple": false,
        "valueField": "{{slug}}"
      },
      "tags": {
        "collection": "tags",
        "multiple": true,
        "valueField": "{{slug}}"
      }
    }
  },
  "settings": {
    "kind": "files",
    "files": [
      {
        "name": "general",
        "file": "content/settings/general.yml",
        "format": "yaml",
        "relations": {
          "activeScheme": {
            "collection": "colour-schemes",
            "multiple": false,
            "valueField": "{{slug}}"
          }
        }
      }
    ]
  },
  "tags": {
    "kind": "folder",
    "folder": "content/tags",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  }
} as const;

export type CollectionName = keyof typeof collections;
