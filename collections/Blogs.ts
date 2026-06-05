import {
  lexicalEditor,
  BlocksFeature,
  FixedToolbarFeature,
  EXPERIMENTAL_TableFeature,
  InlineCodeFeature,
  TreeViewFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig, Block } from 'payload';

export const CodeSnippet: Block = {
  slug: 'code',
  fields: [
    { name: 'filename', type: 'text' },
    {
      name: 'language',
      type: 'select',
      options: ['typescript', 'javascript', 'go', 'python', 'yaml', 'cpp', 'css', 'java', 'shell'],
    },
    { name: 'code', type: 'textarea' },
  ],
};

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({ blocks: [CodeSnippet] }),
          TreeViewFeature()
        ],
      }),
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}


