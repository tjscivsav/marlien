import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'profile',
  type: 'object',
  title: 'Profile',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'figure',
      title: 'Desktop Avatar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileAvatar',
      type: 'figure',
      title: 'Mobile Avatar',
      description: 'Optional. If not provided Desktop Avatar will be used on Mobile.',
    }),
    defineField({
      title: 'Large Avatar',
      name: 'isLarge',
      type: 'boolean',
      description: 'Make large avatar except small circle',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.avatar && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
    defineField({
      title: 'Space from top',
      name: 'pt',
      type: 'number',
      validation: (rule) => rule.min(0),
      description: 'The top padding for large avatar. (Optional)',
      hidden: ({parent}) => !parent?.isLarge,
    }),
    defineField({
      name: 'border',
      type: 'border',
      title: 'Border of avatar',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'name',
      type: 'colorText',
      title: 'Your Name',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'username',
      type: 'colorText',
      title: 'Username',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Link for username',
      name: 'nameLink',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https', 'mailto'],
          })
          .custom((currentValue, {parent}) => {
            if (parent?.username && currentValue === undefined) return 'This is required'
            return true
          }),
      hidden: ({parent}) => !parent?.username,
    }),
    defineField({
      title: 'Check Mark',
      name: 'checkColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      description: 'Check mark color',
    }),
    defineField({
      name: 'socialList',
      type: 'array',
      title: 'Social List',
      of: [{type: 'reference', to: {type: 'social'}}],
    }),
    defineField({
      name: 'navLinks',
      type: 'array',
      title: 'Links',
      of: [{type: 'link'}],
    }),
  ],
})
