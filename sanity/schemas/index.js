// pages
import homePage from './pages/home'
import siteSettings from './pages/siteSettings'

// documents
// Document types
import product from './documents/product'
import productVariant from './documents/productVariant'
import socialDoc from './documents/social'

// objects
import productSection from './objects/home/product.js'
import border from './objects/common/border.js'
import colorText from './objects/common/colorText'
import editor from './objects/common/editor.js'
import embedTwitter from './objects/common/embedTwitter'
import figure from './objects/common/figure'
import itemSvg from './objects/common/itemSvg'
import pageBg from './objects/common/pageBg'
import sectionHeading from './objects/common/sectionHeading.js'
import seo from './objects/common/seo'
import simpleBlock from './objects/common/simpleBlock'

import chatbot from './objects/chatbot.js'
import bgColor from './objects/common/bgColor.js'
import commonBg from './objects/common/commonBg.js'
import commonBg2 from './objects/common/commonBg2.js'
import embedElfsight from './objects/common/embedElfsight.js'
import embedInstagram from './objects/common/embedInstagram.js'
import embedTiktok from './objects/common/embedTiktok.js'
import exitPopup from './objects/common/exitPopup.js'
import link from './objects/common/link.js'
import textBox from './objects/common/textBox.js'
import title from './objects/common/title.js'
import blogItem from './objects/home/blogItem'
import coaching from './objects/home/coaching'
import collage from './objects/home/collage'
import collection from './objects/home/collection'
import collectionItem from './objects/home/collection/item.js'
import footerSocial from './objects/home/footerSocial'
import gallery from './objects/home/gallery.js'
import poster from './objects/home/poster'
import profile from './objects/home/profile'
import section from './objects/home/section'
import update from './objects/home/update'
import videoItem from './objects/home/update/item'
import videoLink from './objects/home/videoLink.js'
import embeded from './objects/common/embeded.js'

// Shopify

import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import inventory from './objects/shopify/inventory'
import option from './objects/shopify/option'
import priceRange from './objects/shopify/priceRange'
import productWithVariant from './objects/shopify/productWithVariant'
import proxyString from './objects/shopify/proxyString'
import shopifyProduct from './objects/shopify/shopifyProduct'
import shopifyProductVariant from './objects/shopify/shopifyProductVariant'

export const schemaTypes = [
  siteSettings,
  homePage,
  socialDoc,
  product,
  productVariant,
  productSection,
  seo,
  pageBg,
  figure,
  profile,
  coaching,
  itemSvg,
  section,
  collection,
  collectionItem,
  poster,
  collage,
  update,
  videoItem,
  footerSocial,
  colorText,
  simpleBlock,
  embedTwitter,
  blogItem,
  border,
  sectionHeading,
  exitPopup,
  bgColor,
  commonBg,
  commonBg2,
  chatbot,
  embedElfsight,
  embedInstagram,
  embedTiktok,
  editor,
  textBox,
  title,
  gallery,
  videoLink,
  embeded,
  link,

  // Shopify

  inventory,
  moduleProduct,
  moduleProducts,
  priceRange,
  option,
  productWithVariant,
  proxyString,
  shopifyProduct,
  shopifyProductVariant,
]
