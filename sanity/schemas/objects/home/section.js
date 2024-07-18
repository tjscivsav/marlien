import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'blogSection',
  type: 'object',
  title: 'Blog Section',
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
      name: 'bgColor',
      type: 'color',
      title: 'Card Background color',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.layoutType === 'a' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.layoutType === 'b',
    }),
    defineField({
      name: 'bgHoverColor',
      type: 'color',
      title: 'Card Background Hover color',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.layoutType === 'a' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.layoutType === 'b',
    }),
    defineField({
      name: 'blogList',
      type: 'array',
      title: 'List',
      of: [{type: 'blogItem'}],
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
