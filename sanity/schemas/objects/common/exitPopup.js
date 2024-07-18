import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'exitPopup',
  title: 'Popup',
  type: 'object',
  initialValue: () => ({
    enable: false,
  }),
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      initialValue: false,
      description: 'Enable/Disable the popup',
    }),
    defineField({
      title: 'Two Columns',
      name: 'twoCol',
      type: 'boolean',
      description:
        'One for text & second for image (Two Columns). Text over the background and centered (One Column). Default is one column',
    }),
    defineField({
      title: 'Text Align',
      name: 'align',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      description: 'the default value is left',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'colorText',
      validation: (rule) => [
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'colorText',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'btnText',
      title: 'Button Text',
      type: 'colorText',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'btnUrl',
      title: 'Button URL',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https', 'mailto'],
          })
          .custom((currentValue, {parent}) => {
            if (parent?.btnText && currentValue === undefined) return 'This is required'
            return true
          }),

      hidden: ({parent}) => !parent?.btnText,
    }),
    defineField({
      title: 'Button Border',
      name: 'btnBorder',
      type: 'border',
      description: 'The border of the button (Optional)',
      options: {
        collapsible: true,
        collapsed: true,
      },

      hidden: ({parent}) => !parent?.btnText,
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
      hidden: ({parent}) => !parent?.btnText,
    }),
    defineField({
      name: 'bg',
      title: 'Background',
      type: 'commonBg',
      description: 'This is for single column or first column.',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'img',
      title: 'Image',
      type: 'figure',
      description: 'The image place in second column',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.twoCol && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => !parent?.twoCol,
    }),
    defineField({
      title: 'Image Border',
      name: 'border',
      type: 'border',
      hidden: ({parent}) => !parent?.twoCol,
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
})
