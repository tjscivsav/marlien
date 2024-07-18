import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'textBox',
  title: 'Text Box',
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
      title: 'Section ID',
      name: 'sectionId',
      type: 'string',
      description:
        'Section ID is option. It will be required if you want a particular section to navigate to this section',
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
      title: 'Editor',
      name: 'editor',
      type: 'editor',
      description: 'The text box with heading , paragraph and color option',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text Box',
      }
    },
  },
})
