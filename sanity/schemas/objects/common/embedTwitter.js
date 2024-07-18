import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'embedTwitter',
  title: 'Embed Twitter',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Twitter Username',
      type: 'string',
      description: 'e.g BillGates, elonmusk etc',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
})
