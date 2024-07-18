import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'update',
  type: 'object',
  title: 'Update',
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
      name: 'sectionHeading',
      type: 'sectionHeading',
      title: 'Section Heading',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      initialValue: 'a',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Default', value: 'a'},
          {title: 'Slider', value: 'b'},
        ],
      },
    }),
    defineField({
      title: 'Two Columns',
      name: 'twoCol',
      type: 'boolean',
      description: 'The list two columns only for deskotp',
      hidden: ({parent}) => parent?.layoutType === 'b',
    }),
    defineField({
      title: 'Enable Video Icon',
      name: 'enableIcon',
      type: 'boolean',
      description: 'By Default its disabled',
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'List',
      of: [{type: 'videoItem'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'border',
      type: 'border',
      title: 'Border of list item',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'arrowColor',
      type: 'color',
      title: 'Arrow color',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.layoutType === 'b' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.layoutType === 'a',
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading.heading.txt',
    },
  },
})
