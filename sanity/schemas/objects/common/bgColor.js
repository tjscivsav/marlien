import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Background Color',
  name: 'bgColor',
  type: 'object',

  fields: [
    defineField({
      title: 'Gradient',
      name: 'isGradient',
      type: 'boolean',
      description: 'Enable gradient color',
    }),
    defineField({
      title: 'Color',
      name: 'color1',
      type: 'color',
    }),
    defineField({
      title: 'Color 2',
      name: 'color2',
      type: 'color',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.isGradient && parent?.color1 && currentValue === undefined)
            return 'This is required'
          return true
        }),
      hidden: ({parent}) => !parent?.isGradient,
    }),
  ],
})
