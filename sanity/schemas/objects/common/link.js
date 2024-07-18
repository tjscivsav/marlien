import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      description: 'Optional. By Default, the link type is URL',
      options: {
        list: [
          {
            title: 'URL',
            value: 'url',
          },
          {
            title: 'Section ID',
            value: 'sectionId',
          },
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.linkType !== 'sectionId' && currentValue === undefined)
            return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.linkType === 'sectionId',
    }),
    defineField({
      title: 'Section ID',
      name: 'sectionId',
      type: 'string',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.linkType === 'sectionId' && currentValue === undefined)
            return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.linkType !== 'sectionId',
    }),
    // },
  ],
})
