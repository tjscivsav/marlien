import home from './home'
import products from './productStructure'
import settings from './siteSettings'

// Hide document types that we already have a structure definition for
const hiddenDocTypes = (listItem) =>
  !['siteSettings', 'homePage', 'product', 'productVariant'].includes(listItem.getId())

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      home(S),
      settings(S),
      S.divider(),
      products(S),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
