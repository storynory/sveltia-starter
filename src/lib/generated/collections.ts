// Generated automatically. Do not edit.

export const collections = {
  "authors": {
    "kind": "folder",
    "publicRoute": false,
    "template": "default",
    "folder": "content/authors",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "categories": {
    "kind": "folder",
    "publicRoute": false,
    "template": "default",
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
    "publicRoute": false,
    "template": "default",
    "folder": "content/colour-schemes",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "navigation": {
    "kind": "folder",
    "publicRoute": false,
    "template": "default",
    "folder": "content/navigation",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  },
  "pages": {
    "kind": "folder",
    "publicRoute": true,
    "template": "page",
    "folder": "content/pages",
    "extension": "md",
    "format": "markdown",
    "relations": {}
  },
  "posts": {
    "kind": "folder",
    "publicRoute": true,
    "template": "post",
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
  "stories": {
    "kind": "folder",
    "publicRoute": true,
    "template": "post",
    "folder": "content/stories",
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
  "tags": {
    "kind": "folder",
    "publicRoute": false,
    "template": "default",
    "folder": "content/tags",
    "extension": "yml",
    "format": "yaml",
    "relations": {}
  }
} as const;

export type CollectionName = keyof typeof collections;
