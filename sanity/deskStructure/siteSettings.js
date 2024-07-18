import {CogIcon} from '@sanity/icons'
export default (S) =>
  S.listItem()
    .title('Site Settings')
    .child(S.document().id('siteSettings').schemaType('siteSettings').documentId('siteSettings'))
    .icon(CogIcon)
