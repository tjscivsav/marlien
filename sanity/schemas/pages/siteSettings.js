import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Settings',
  fields: [
    defineField({
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'exitPopup',
      type: 'exitPopup',
      title: 'Exit Popup',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Setting',
      }
    },
  },
})
