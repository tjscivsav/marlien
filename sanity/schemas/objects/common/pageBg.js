import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Background',
  name: 'pageBg',
  type: 'object',
  fieldsets: [
    {
      title: 'Gradient',
      name: 'gradient',
      description: 'Choose the colors for gradient effect',
      hidden: ({parent}) => parent?.bgType !== 'gradient',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 1,
      },
    },
  ],
  fields: [
    defineField({
      title: 'Background Type',
      name: 'bgType',
      type: 'string',
      description: 'The blur option using the profile image as background effect',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Gradient', value: 'gradient'},
          {title: 'Blur', value: 'blur'},
        ],
      },
    }),
    defineField({
      title: 'Content area background',
      name: 'color3',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'blur' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType !== 'blur',
    }),
    defineField({
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      name: 'bg',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'image' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType !== 'image',
    }),
    defineField({
      title: 'Color 1',
      name: 'color1',
      type: 'color',
      fieldset: 'gradient',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'gradient' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType !== 'gradient',
    }),
    defineField({
      title: 'Color 2',
      name: 'color2',
      type: 'color',
      fieldset: 'gradient',
      options: {
        disableAlpha: true,
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.bgType === 'gradient' && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => parent?.bgType !== 'gradient',
    }),
  ],
})
