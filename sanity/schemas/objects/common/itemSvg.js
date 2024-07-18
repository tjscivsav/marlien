import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'itemSvg',
  title: 'Item',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      type: 'colorText',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bg',
      type: 'commonBg2',
      title: 'Background',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Image Type',
      name: 'imgType',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'img'},
          {title: 'SVG', value: 'svg'},
        ],
      },
    }),
    defineField({
      name: 'svg',
      type: 'text',
      title: 'SVG Code',
      description: 'Paste the svg format code',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.imgType === 'svg' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.imgType !== 'svg',
    }),
    defineField({
      name: 'img',
      type: 'image',
      options: {
        hotspot: true,
      },
      title: 'Image',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.imgType === 'img' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.imgType !== 'img',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title.txt',
    },
  },
})
