import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'sectionHeading',
  title: 'Section Heading',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'colorText',
    }),
    defineField({
      name: 'barColor',
      title: 'Bar Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.heading && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'heading.txt',
    },
  },
})
