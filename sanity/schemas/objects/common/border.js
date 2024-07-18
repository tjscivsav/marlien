import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'border',
  title: 'Border',
  type: 'object',
  initialValue: () => ({
    enable: false,
  }),
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      initialValue: false,
      description: 'Enable/Disable the border',
    }),
    defineField({
      name: 'width',
      title: 'Border Width',
      type: 'number',
      description: 'The value of border width between 0-50',
      validation: (rule) => [
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
        rule.min(0).max(50),
      ],
    }),
    defineField({
      name: 'borderColor',
      title: 'Border Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.width && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Border',
      }
    },
  },
})
