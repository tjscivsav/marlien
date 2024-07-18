import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'title',
  title: 'Title',
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
      title: 'Text Align',
      name: 'align',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      description: 'the default value is center',
    }),
    defineField({
      title: 'Heading',
      name: 'sectionHeading',
      type: 'colorText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Title',
      }
    },
  },
})
