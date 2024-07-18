import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
      description: 'Important for SEO and accessiblity.',
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
  },
})
