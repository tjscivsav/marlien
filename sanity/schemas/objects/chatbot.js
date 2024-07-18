import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'chatbot',
  type: 'object',
  title: 'Chatbot',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the chatbot',
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
      name: 'btnText',
      type: 'colorText',
      title: 'Button Text',
      description: 'The button use to open the chatbot',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'btnType',
      type: 'string',
      title: 'Button Type',
      initialValue: 'url',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {
            title: 'URL',
            value: 'url',
          },
          {
            title: 'Subscribe',
            value: 'subscribe',
          },
          {
            title: 'Chatbot',
            value: 'chatbot',
          },
        ],
      },
    }),
    defineField({
      name: 'subscribeBy',
      type: 'string',
      title: 'Subscribe By',
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
        ],
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType !== 'url' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.btnType === 'url',
    }),
    defineField({
      title: 'Button Border',
      name: 'border',
      type: 'border',
      description: 'The border of the button (Optional)',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Button Background',
      name: 'btnBg',
      type: 'commonBg2',
      description: 'The background of the button (Optional). Default is transparent',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'btnUrl',
      type: 'url',
      title: 'Button Url',
      description: 'The button use to open the chatbot',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .custom((currentValue, {parent}) => {
            if (parent?.btnType === 'url' && currentValue === undefined) return 'This is required'
            return true
          }),
      hidden: ({parent}) => parent?.btnType !== 'url',
    }),
    defineField({
      title: 'Avatar Image',
      name: 'avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The image display as avatar in chat',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType === 'chatbot' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.btnType !== 'chatbot',
    }),
    defineField({
      title: 'Bot Name',
      name: 'botName',
      type: 'string',
      description: 'Name of the bot',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType === 'chatbot' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.btnType !== 'chatbot',
    }),
    defineField({
      title: 'Description',
      name: 'des',
      type: 'string',
      description: 'Description below the name',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType === 'chatbot' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.btnType !== 'chatbot',
    }),
    defineField({
      title: 'Color',
      name: 'botColor',
      type: 'color',
      description: 'Bot dialog color',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType === 'chatbot' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.btnType !== 'chatbot',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Chatbot',
      }
    },
  },
})
