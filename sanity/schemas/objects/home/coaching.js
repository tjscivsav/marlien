import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'coaching',
  type: 'object',
  title: 'Coaching',
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
    // defineField({
    //   name: 'avatar',
    //   type: 'figure',
    //   title: 'Avatar',
    //   validation: (rule) => rule.required(),
    // }),
    defineField({
      name: 'heading',
      type: 'colorText',
      title: 'Heading',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'colorText',
      title: 'Description',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'detailList',
      type: 'array',
      title: 'Detail List',
      of: [{type: 'itemSvg'}],
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
  ],
  preview: {
    select: {
      title: 'heading.txt',
    },
  },
})
