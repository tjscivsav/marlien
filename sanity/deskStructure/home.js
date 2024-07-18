import {HomeIcon} from '@sanity/icons'
export default (S) =>
  S.listItem()
    .title('Home Page')
    .child(S.document().id('homePage').schemaType('homePage').documentId('homePage'))
    .icon(HomeIcon)
