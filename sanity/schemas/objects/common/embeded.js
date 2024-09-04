import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'embedSection',
  type: 'object',
  title: 'ShopMy Embed Section',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Embed Code',
      type: 'text',
      description: 'Place the embed iframe from shopmy, which get from elfsight shopmy',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'Embed Section',
    },
  },
})
