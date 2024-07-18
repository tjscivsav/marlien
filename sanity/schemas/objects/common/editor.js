export default {
  name: 'editor',
  type: 'array',
  title: 'Editor',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'heading1', value: 'h1'},
        {title: 'heading2', value: 'h2'},
        {title: 'heading3', value: 'h3'},
        {title: 'heading4', value: 'h4'},
        {title: 'heading5', value: 'h5'},
        {title: 'heading6', value: 'h6'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'Url',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
          {
            name: 'color',
            title: 'Color',
            type: 'color',
          },
        ],
      },
      lists: [],
    },
  ],
}
