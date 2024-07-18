import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'videoItem',
  title: 'Item',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      type: 'colorText',
      title: 'Video Title',
      description: 'Maximum length of characters is 65.',
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
      title: 'Text Align Vertically',
      name: 'alignY',
      type: 'string',
      initialValue: 'top',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
        ],
      },
      description: 'the default value is top',
    }),
    defineField({
      name: 'img',
      type: 'figure',
      title: 'Thumbnail',
      description: 'Video thumbanil',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Youtube Video',
      description: 'Youtube vidoe link',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'img',
      title: 'title.txt',
    },
  },
})
