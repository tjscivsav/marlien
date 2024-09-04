import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'pageBg',
      type: 'pageBg',
      title: 'Page Background',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'profile',
      type: 'profile',
      title: 'Profile',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'sectionBuilder',
      type: 'array',
      title: 'Page Sections',
      description: 'Section order changeable',
      of: [
        {type: 'coaching'},
        {type: 'embedSection'},
        {type: 'collection'},
        {type: 'blogSection'},
        {type: 'update'},
        {type: 'chatbot'},
        {type: 'title'},
        {type: 'productSection'},
        {type: 'textBox'},
        {type: 'gallery'},
        {type: 'poster'},
        {type: 'collage'},
      ],
    }),
    defineField({
      name: 'embedElfsight',
      type: 'array',
      title: 'Elfsight Code',
      description: 'Add the Elfsight code',
      of: [{type: 'embedElfsight'}],
    }),
    defineField({
      name: 'embedInstagram',
      type: 'embedInstagram',
      title: 'Instagram',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'embedTiktok',
      type: 'embedTiktok',
      title: 'Tiktok',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Side By Side',
      name: 'row',
      type: 'boolean',
      initialValue: false,
      description: 'Instagram & Tiktok in one row (side by side on desktop)',
    }),
    defineField({
      name: 'embedTwitter',
      type: 'embedTwitter',
      title: 'Twitter',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'footerSocial',
      type: 'footerSocial',
      title: 'Footer Social',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
