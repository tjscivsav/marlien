import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'footerSocial',
  type: 'object',
  title: 'Footer Social',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Icons Color',
      name: 'iconsColor',
      type: 'color',
      description: 'This is optional. By Default the color on each social icon is implemented',
    }),
    defineField({
      name: 'socialList',
      type: 'array',
      title: 'Social List',
      of: [{type: 'reference', to: {type: 'social'}}],
    }),
    defineField({
      title: 'CC',
      name: 'cc',
      type: 'simpleBlock',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'CC Color',
      name: 'cColor',
      type: 'color',
      description: 'Color of the cc text',
      validation: (rule) => rule.required(),
    }),
  ],
})
