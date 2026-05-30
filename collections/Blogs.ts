import {
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig, Block } from 'payload';

export const CodeSnippet: Block = {
  slug: 'code',
  fields: [
    { name: 'filename', type: 'text' },
    {
      name: 'language',
      type: 'select',
      options: ['ts', 'tsx', 'js', 'jsx', 'go', 'python', 'yaml', 'cpp', 'css', 'java'],
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
          BlocksFeature({
            blocks: [
              CodeSnippet,
            ],
          }),
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


