import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'collection',
  type: 'object',
  title: 'Collection',
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
          {title: 'Type A', value: 'a'},
          {title: 'Type B', value: 'b'},
        ],
      },
    }),
    defineField({
      title: 'Sqaure Card',
      name: 'isSqr',
      type: 'boolean',
      initialValue: false,
      description: 'Make square (1:1) card on frontend',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.layoutType === 'a' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.layoutType === 'b',
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'List',
      of: [{type: 'collectionItem'}],
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
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading.heading.txt',
    },
  },
})
