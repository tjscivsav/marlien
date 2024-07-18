import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'embedTiktok',
  title: 'Embed Tiktok',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the section on frontend',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Embed Code',
      type: 'text',
      description:
        'Note: In tiktok profile, goto share and click on embed and copy the code and please remove the <script> tag code at end in provided code otherwise multiple script will load.',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required'
          return true
        }),
    }),
  ],
})
