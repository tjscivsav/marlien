import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'collectionItem',
  title: 'Item',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      type: 'colorText',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Text Align',
      name: 'align',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      description: 'the default value is left',
    }),
    defineField({
      name: 'img',
      type: 'figure',
      title: 'Image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'img',
      title: 'heading.txt',
    },
  },
})
