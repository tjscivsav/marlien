import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'embedInstagram',
  title: 'Embed Instagram',
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
      name: 'code',
      title: 'Insta Code',
      type: 'text',
      description:
        'Generate the embed from online tool e.g https://www.embedista.com/instagramfeed',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
})
