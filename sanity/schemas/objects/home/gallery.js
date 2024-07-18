import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
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
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'optionalHeading',
      type: 'colorText',
      title: 'Optional Heading',
      description: 'The heading below the section heading',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      name: 'layoutType',
      type: 'string',
      title: 'Layout Type',
      initialValue: 'default',
      options: {
        list: [
          {
            title: 'Default',
            value: 'default',
          },
          {
            title: 'Full Width',
            value: 'full-width',
          },
        ],
      },
    }),
    defineField({
      title: 'Title Background Color',
      name: 'titleBgClr',
      type: 'color',
      description: 'Background Color of All List items title. Optional',
    }),
    defineField({
      name: 'assetList',
      type: 'array',
      title: 'List',
      of: [{type: 'asset'}],
    }),
    defineField({
      title: 'Image Blur',
      name: 'isBlur',
      type: 'boolean',
      description: 'Blur effect on image',
    }),
    defineField({
      title: 'Image Blur',
      name: 'blur',
      type: 'number',
      description: 'The value of blur effect',
      validation: (rule) => [
        rule.custom((currentValue, {parent}) => {
          if (parent?.isBlur && currentValue === undefined) return 'This is required'
          return true
        }),
        rule.min(1).max(20),
      ],
      hidden: ({parent}) => !parent?.isBlur,
    }),
    defineField({
      name: 'formfields',
      type: 'string',
      title: 'Form Fields',
      initialValue: 'email',
      options: {
        list: [
          {
            title: 'Email',
            value: 'email',
          },
          {
            title: 'Phone',
            value: 'phone',
          },
          {
            title: 'Both',
            value: 'both',
          },
          {
            title: 'None',
            value: 'none',
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading.heading.txt',
    },
  },
})
