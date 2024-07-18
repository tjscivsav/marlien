export default {
  name: 'blogItem',
  type: 'object',
  title: 'Item',

  fields: [
    {
      name: 'title',
      type: 'colorText',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    },

    {
      name: 'thumbnail',
      type: 'figure',
      title: 'Thumbnail',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'description',
      type: 'colorText',
      title: 'Short Description',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'title.txt',
    },
  },
}
