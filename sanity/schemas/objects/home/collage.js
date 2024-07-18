import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'collage',
  type: 'object',
  title: 'Collage',

  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'colorText',
      title: 'Title',
      description: 'Maximum length of characters is 65.',
    }),
    defineField({
      title: 'Title Background Color',
      name: 'titleBgClr',
      type: 'color',
      hidden: ({parent}) => !parent?.title,
    }),
    defineField({
      title: 'Overlay',
      name: 'overlay',
      type: 'color',
      description: 'Overlay color over the image',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.title && currentValue === undefined) return 'This is required'

          return true
        }),
      hidden: ({parent}) => !parent?.title,
    }),
    defineField({
      title: 'Text Align Horizontally',
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
      hidden: ({parent}) => !parent?.title,
    }),
    defineField({
      title: 'Text Align Vertically',
      name: 'alignY',
      type: 'string',
      initialValue: 'top',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
        ],
      },
      description: 'the default value is top',
      hidden: ({parent}) => !parent?.title,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Your Image',
      validation: (rule) => rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
        hotspot: true,
      },
    }),
    defineField({
      title: 'Link Type',
      name: 'linkType',
      type: 'string',
      initialValue: 'url',
      description: 'Default Link Type is URL',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Section ID', value: 'sectionId'},
        ],
      },
    }),
    defineField({
      name: 'imgLink',
      type: 'url',
      title: 'Image URL',
      // validation: (rule) =>
      //   rule.custom((currentValue, {parent}) => {
      //     if (parent?.graphicType === 'image' && currentValue === undefined)
      //       return 'This is required'

      //     return true
      //   }),
      hidden: ({parent}) => parent?.linkType === 'sectionId',
    }),
    defineField({
      name: 'sectionId',
      type: 'string',
      title: 'Section ID',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.linkType === 'sectionId' && currentValue === undefined)
            return 'This is required'

          return true
        }),
      description: 'Section ID of the section at which you want to navigate',
      hidden: ({parent}) => parent?.linkType !== 'sectionId',
    }),
  ],
  preview: {
    select: {
      title: 'title.txt',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title ? title : 'Collage',
        media: media,
      }
    },
  },
})
