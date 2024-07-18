import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Background',
  name: 'commonBg',
  type: 'object',

  fields: [
    defineField({
      title: 'Background Type',
      name: 'bgType',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Color', value: 'color'},
        ],
      },
    }),
    defineField({
      title: 'Image',
      type: 'image',
      name: 'bg',
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'image' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType !== 'image',
    }),
    defineField({
      title: 'Image Border',
      name: 'border',
      type: 'border',
      hidden: ({parent}) => parent?.bgType === 'color',
    }),
    defineField({
      title: 'Colors',
      name: 'bgColor',
      type: 'bgColor',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'color' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType === 'image',
    }),
  ],
})
