import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'poster',
  type: 'object',
  title: 'Poster',

  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Section ID',
      name: 'sectionId',
      type: 'string',
      description:
        'Section ID is option. It will be required if you want a particular section to navigate to this section',
    }),
    defineField({
      name: 'title',
      type: 'colorText',
      title: 'Title',
      description: 'Optional',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'description',
      type: 'colorText',
      title: 'Description',
      description: 'Optional',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'thumbnail',
      type: 'figure',
      title: 'Thumbnail',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      description: 'The external link. https://www.exampel.com',
    }),
    defineField({
      name: 'border',
      type: 'border',
      title: 'Border of image',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title.txt',
      media: 'thumbnail',
    },
    prepare({title, media}) {
      return {
        title: title ? title : 'Poster',
        media: media,
      }
    },
  },
})
