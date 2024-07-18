import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'embedElfsight',
  title: 'Embed Elfsight',
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
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the script',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
    defineField({
      name: 'code',
      title: 'Embed Code',
      type: 'text',
      description: 'Place the embed div for elfsight script, which get from elfsight dashboard',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      enable: 'enable',
    },
    prepare({title, enable}) {
      return {
        title: title,
        subtitle: `Enabled: ${enable}`,
      }
    },
  },
})
