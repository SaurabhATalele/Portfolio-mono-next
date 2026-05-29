import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: 'users',
    },
    collections: [
        {
            slug: 'users',
            auth: true,
            access: {
                delete: () => false,
                update: () => false,
            },
            fields: [],
        },
        {
            slug: 'blogs',
            admin: {
                useAsTitle: 'title',
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
                },
                {
                    name: 'content',
                    type: 'richText',
                    editor: lexicalEditor({}),
                    required: true,
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
            ],
        },
        {
            slug: 'media',
            upload: true,
            fields: [
                {
                    name: 'alt',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-build-only',
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
    }),
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
})