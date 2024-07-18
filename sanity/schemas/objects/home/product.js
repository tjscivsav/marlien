import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'productSection',
  type: 'object',
  title: 'Product Section',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description:
        'Enable/Disable the section on frontend. When section enable the cart icon also display',
      validation: (rule) => rule.required(),
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
      name: 'productList',
      type: 'array',
      title: 'Product List',
      description: 'This is only for default workspace',
      of: [{type: 'reference', to: {type: 'product'}}],
    }),

    // defineField({
    //   name: 'productId',
    //   type: 'array',
    //   title: 'Product List',
    //   description:
    //     'This is only for dev workspace. Just copy the product GID from default workspace in product detail and paste into it.',
    //   of: [{type: 'string'}],
    // }),

    defineField({
      title: 'Cart Icon',
      name: 'cartColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      description: 'Cart icon color',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading.heading.txt',
    },
  },
})
