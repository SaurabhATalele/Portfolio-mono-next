import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'rating', 'approved', 'createdAt'],
  },
  access: {
    read: () => true, // Anyone can view testimonials
    create: () => true, // testimonial creation allowed
    update: () => true, // Allowed for management
    delete: () => true, // Allowed for management
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'avatar',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true, // Show immediately after adding
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
