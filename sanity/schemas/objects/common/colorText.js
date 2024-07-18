import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'colorText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'txt',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'textColor',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.txt && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'txt',
    },
  },
})
