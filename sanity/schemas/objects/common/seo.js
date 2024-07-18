export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'pagehandle',
      title: 'Page Handle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your page.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    // {
    //   name: 'ldSchema',
    //   title: 'LD Schema',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'text',
    //     },
    //   ],
    // },
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO',
      }
    },
  },
}
