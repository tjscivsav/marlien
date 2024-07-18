import { Script, graphql } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useExitIntent } from "use-exit-intent";
import ChatBtn from "../components/ChatBtn";
import Collage from "../components/Collage";
import Gallery from "../components/Gallery";
import Popup from "../components/Popup";
import Poster from "../components/Poster";
import Seo from "../components/SEO";
import TextPortable from "../components/TextPortable";
import Title from "../components/Title";
import Blogs from "../components/blogs";
import Collection from "../components/collections";
import Detail from "../components/common/detail";
import Profile from "../components/common/profile";
import SocialLarge from "../components/common/social/Large";
import Products from "../components/products";
import Updates from "../components/updates";
import { StoreProvider } from "../context/storeContext";
import useIsVisible from "../hooks/isVisible";

export default function Home({ data: { sanityHomePage, sanitySiteSettings } }) {
  const pageBg = sanityHomePage?.pageBg;
  const exitPopup = sanitySiteSettings?.exitPopup;
  const divRef = useRef(null);
  const isVisible = useIsVisible(divRef);
  const [popup, setPopup] = useState(false);
  const [border, setBorder] = useState({});
  let product;
  const {
    profile,
    footerSocial,
    sectionBuilder,
    embedElfsight,
    embedTwitter,
    embedInstagram,
    embedTiktok,
    row,
  } = sanityHomePage;

  const { unsubscribe, registerHandler } = useExitIntent({
    cookie: {
      key: "exit-intent",
      daysToExpire: 1,
    },
  });

  const galleries = sectionBuilder.filter(
    (item) => item._type === "gallery" && item.layoutType == "full-width"
  );
  const featuredImages = galleries.find((item) => item.enable);

  sectionBuilder?.forEach((item) => {
    if (item._type === "productSection") {
      product = item;
    }
  });

  const _renderSection = (item, key) => {
    const { enable, _type } = item;
    switch (_type) {
      case "coaching":
        return enable && <Detail data={item} key={key} />;
      case "collection":
        return enable && <Collection data={item} key={key} />;
      case "blogSection":
        return enable && <Blogs data={item} key={key} />;
      case "update":
        return enable && <Updates data={item} key={key} />;
      case "chatbot": {
        return enable && <ChatBtn data={item} key={key} />;
      }
      case "productSection": {
        return (
          enable && (
            <div className="lb-container layout mb-10">
              <Products data={item} key={key} />
            </div>
          )
        );
      }
      case "title": {
        return enable && <Title data={item} key={key} />;
      }
      case "textBox": {
        return enable && <TextPortable data={item} key={key} />;
      }
      case "gallery": {
        return enable && <Gallery data={item} key={key} />;
      }
      case "collage": {
        console.log(item);
        return enable && <Collage data={item} key={key} />;
      }
      case "poster": {
        return enable && <Poster data={item} key={key} />;
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    registerHandler({
      id: "openModal",
      handler: () => {
        setPopup(true);
      },
    });

    return () => unsubscribe();
  }, []);

  const contentBg = {
    backgroundColor: pageBg.bgType === "blur" ? `${pageBg?.color3?.hex}` : "",
  };

  return (
    <StoreProvider>
      {isVisible && embedElfsight?.length > 0 && (
        <Script src="https://static.elfsight.com/platform/platform.js" />
      )}
      {isVisible && embedTiktok?.enable && (
        <Script src="https://www.tiktok.com/embed.js" />
      )}
      {isVisible && embedInstagram?.enable && (
        <Script src="https://www.instagram.com/embed.js" />
      )}
      {pageBg.bgType === "blur" && (
        <div
          className="mx-auto background min-h-screen"
          style={{
            backgroundImage: `url("${profile?.avatar?.asset?.url}")`,
            backgroundRepeat: "repeat",
          }}
        />
      )}
      <div
        className={`${pageBg.bgType === "blur" ? "py-10" : "py-0"}`}
        style={{
          backgroundImage:
            pageBg.bgType === "image"
              ? `url(${pageBg?.bg?.asset?.url})`
              : pageBg.bgType === "gradient"
              ? `linear-gradient(to right,${pageBg?.color1?.hex},${pageBg.color2?.hex})`
              : "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`pb-[90px] ${
            featuredImages.layoutType !== "full-width" &&
            "pt-[20px] sm:pt-[90px]"
          }`}
          style={pageBg.bgType === "blur" ? contentBg : {}}
        >
          {profile && profile.enable && (
            <Profile data={profile} bg={pageBg.bgType} />
          )}

          {sectionBuilder &&
            sectionBuilder.map((item, index) => _renderSection(item, index))}
          <div ref={divRef} className="lb-container layout  px-3 md:px-5">
            {isVisible && (
              <>
                {embedElfsight?.length > 0 &&
                  embedElfsight?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{ borderRadius: 10, overflow: "hidden" }}
                          dangerouslySetInnerHTML={{
                            __html: item.code,
                          }}
                        />
                      </div>
                    );
                  })}
                <div
                  className={`grid ${
                    row
                      ? "grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-3"
                      : "grid-cols-1 gap-y-2 iframe-col"
                  } `}
                >
                  {embedInstagram && embedInstagram.enable && (
                    <div
                      className="embed-iframe w-full h-full"
                      dangerouslySetInnerHTML={{
                        __html: embedInstagram.code,
                      }}
                    />
                  )}
                  {embedTiktok && embedTiktok.enable && (
                    <div
                      className="w-full h-full embed-iframe"
                      dangerouslySetInnerHTML={{
                        __html: embedTiktok.code,
                      }}
                    />
                  )}
                </div>
                {embedTwitter && embedTwitter.enable && (
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName={embedTwitter.username}
                    options={{ height: 600 }}
                  />
                )}
              </>
            )}
          </div>
          {footerSocial && footerSocial.enable && (
            <SocialLarge data={footerSocial} />
          )}
        </div>
      </div>
      {exitPopup && exitPopup.enable && (
        <Popup
          value={popup}
          data={exitPopup}
          onClose={() => setPopup(!popup)}
        />
      )}
      <Toaster />
    </StoreProvider>
  );
}
export function Head({ location, data }) {
  return (
    <Seo
      location={location}
      data={data?.sanityHomePage?.seo}
      favicon={data?.sanitySiteSettings?.favicon}
    />
  );
}

export const query = graphql`
  {
    sanityHomePage {
      seo {
        description
        keywords
        title
        pagehandle
      }
      pageBg {
        bgType
        bg {
          hotspot {
            x
            y
          }
          crop {
            right
            top
            left
            bottom
          }
          asset {
            _id
            metadata {
              blurHash
            }
            url
          }
        }
        color1 {
          hex
        }
        color2 {
          hex
        }
        color3 {
          hex
        }
      }
      profile {
        enable
        name {
          txt
          textColor {
            hex
          }
        }
        username {
          txt
          textColor {
            hex
          }
        }
        nameLink
        avatar {
          alt
          hotspot {
            x
            y
          }
          crop {
            right
            top
            left
            bottom
          }
          asset {
            _id
            metadata {
              blurHash
            }
            url
          }
        }
        mobileAvatar {
          alt
          hotspot {
            x
            y
          }
          crop {
            right
            top
            left
            bottom
          }
          asset {
            _id
            metadata {
              blurHash
            }
            url
          }
        }
        isLarge
        pt
        border {
          enable
          width
          borderColor {
            hex
          }
        }
        socialList {
          name
          url
          iconColor {
            hex
          }
          icon
        }
        navLinks {
          title
          linkType
          url
          sectionId
        }
        checkColor {
          hex
        }
      }
      sectionBuilder {
        ... on SanityCoaching {
          _type
          sectionId
          enable
          heading {
            txt
            textColor {
              hex
            }
          }
          description {
            txt
            textColor {
              hex
            }
          }
          detailList {
            bg {
              bgType
              bgColor {
                color1 {
                  hex
                }
                color2 {
                  hex
                }
                isGradient
              }
              bg {
                hotspot {
                  x
                  y
                }
                crop {
                  right
                  top
                  left
                  bottom
                }
                asset {
                  _id
                  metadata {
                    blurHash
                  }
                  url
                }
              }
            }
            imgType
            img {
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
              }
            }
            title {
              txt
              textColor {
                hex
              }
            }
            link
            svg
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
        }
        ... on SanityCollection {
          _type
          sectionId
          enable
          isSqr
          sectionHeading {
            heading {
              txt
              textColor {
                hex
              }
            }
            barColor {
              hex
            }
          }
          layoutType
          list {
            link
            heading {
              txt
              textColor {
                hex
              }
            }

            align
            img {
              alt
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
              }
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
          arrowColor {
            hex
          }
        }
        ... on SanityProductSection {
          _type
          enable
          sectionHeading {
            heading {
              txt
              textColor {
                hex
              }
            }
            barColor {
              hex
            }
          }
          cartColor {
            hex
          }
          productList {
            store {
              title
              previewImageUrl
              slug {
                current
              }
              priceRange {
                maxVariantPrice
                minVariantPrice
              }
              variants {
                store {
                  gid
                  price
                  title
                }
              }
            }
          }
        }
        ... on SanityBlogSection {
          _type
          sectionId
          enable
          sectionHeading {
            heading {
              txt
              textColor {
                hex
              }
            }
            barColor {
              hex
            }
          }
          layoutType
          bgColor {
            rgb {
              r
              g
              b
              a
            }
          }
          bgHoverColor {
            rgb {
              r
              g
              b
              a
            }
          }
          arrowColor {
            hex
          }
          blogList {
            description {
              txt
              textColor {
                hex
              }
            }
            link
            title {
              txt
              textColor {
                hex
              }
            }
            thumbnail {
              alt
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
                url
              }
            }
          }

          border {
            width
            enable
            borderColor {
              hex
            }
          }
        }
        ... on SanityUpdate {
          _type
          sectionId
          enable
          sectionHeading {
            heading {
              txt
              textColor {
                hex
              }
            }
            barColor {
              hex
            }
          }
          layoutType
          twoCol
          enableIcon
          arrowColor {
            hex
          }
          list {
            link
            title {
              txt
              textColor {
                hex
              }
            }
            align
            alignY
            img {
              alt
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
                url
              }
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
        }
        ... on SanityChatbot {
          _type
          sectionId
          enable
          botColor {
            hex
          }
          des
          avatar {
            hotspot {
              x
              y
            }
            crop {
              right
              top
              left
              bottom
            }
            asset {
              _id
              metadata {
                blurHash
              }
              url
            }
          }
          botName
          btnType
          subscribeBy
          btnUrl
          btnText {
            txt
            textColor {
              hex
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
          btnBg {
            bgType
            bgColor {
              color1 {
                hex
              }
              color2 {
                hex
              }
              isGradient
            }
            bg {
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
                url
              }
            }
          }
        }
        ... on SanityTextBox {
          _type
          sectionId
          enable
          align
          _rawEditor
        }
        ... on SanityTitle {
          _type
          enable
          align
          sectionHeading {
            txt
            textColor {
              hex
            }
          }
        }
        ... on SanityGallery {
          _type
          _key
          sectionId
          enable
          sectionHeading {
            heading {
              txt
              textColor {
                hex
              }
            }
            barColor {
              hex
            }
          }
          optionalHeading {
            txt
            textColor {
              hex
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
          layoutType
          titleBgClr {
            hex
          }
          assetList {
            enable
            title {
              txt
              textColor {
                hex
              }
            }
            overlay {
              rgb {
                r
                g
                b
                a
              }
            }
            align
            alignY
            videoType
            linkType
            sectionId
            link
            imgLink
            graphicType
            image {
              hotspot {
                x
                y
              }
              crop {
                right
                top
                left
                bottom
              }
              asset {
                _id
                metadata {
                  blurHash
                }
              }
            }
          }
          isBlur
          blur
          formfields
        }

        ... on SanityCollage {
          enable
          _type
          title {
            txt
            textColor {
              hex
            }
          }
          titleBgClr {
            hex
          }
          overlay {
            rgb {
              r
              g
              b
              a
            }
          }
          align
          alignY
          linkType
          sectionId
          imgLink
          image {
            hotspot {
              x
              y
            }
            crop {
              right
              top
              left
              bottom
            }
            asset {
              _id
              metadata {
                blurHash
              }
            }
          }
        }
        ... on SanityPoster {
          _type
          sectionId
          enable
          title {
            txt
            textColor {
              hex
            }
          }
          description {
            txt
            textColor {
              hex
            }
          }
          link
          thumbnail {
            alt
            hotspot {
              x
              y
            }
            crop {
              right
              top
              left
              bottom
            }
            asset {
              _id
              metadata {
                blurHash
              }
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
        }
      }
      embedElfsight {
        enable
        title
        code
      }
      embedTwitter {
        enable
        username
      }
      embedInstagram {
        enable
        code
      }
      embedTiktok {
        enable
        code
      }
      row

      footerSocial {
        enable
        _rawCc
        iconsColor {
          hex
        }
        cColor {
          hex
        }
        socialList {
          url
          iconColor {
            hex
          }
          icon
        }
      }
    }

    sanitySiteSettings {
      favicon {
        hotspot {
          x
          y
        }
        crop {
          right
          top
          left
          bottom
        }
        asset {
          _id
          metadata {
            blurHash
          }
          url
        }
      }
      exitPopup {
        align
        title {
          txt
          textColor {
            hex
          }
        }
        description {
          txt
          textColor {
            hex
          }
        }
        btnText {
          txt
          textColor {
            hex
          }
        }
        btnUrl
        btnBorder {
          enable
          width
          borderColor {
            hex
          }
        }
        btnBg {
          bgType
          bgColor {
            color1 {
              hex
            }
            color2 {
              hex
            }
            isGradient
          }
          bg {
            hotspot {
              x
              y
            }
            crop {
              right
              top
              left
              bottom
            }
            asset {
              _id
              metadata {
                blurHash
              }
              url
            }
          }
        }
        enable
        twoCol
        img {
          alt
          hotspot {
            x
            y
          }
          crop {
            right
            top
            left
            bottom
          }
          asset {
            _id
            metadata {
              blurHash
            }
          }
        }
        border {
          enable
          width
          borderColor {
            hex
          }
        }
        bg {
          bgType
          bg {
            hotspot {
              x
              y
            }
            crop {
              right
              top
              left
              bottom
            }
            asset {
              _id
              metadata {
                blurHash
              }
              url
            }
          }
          border {
            enable
            width
            borderColor {
              hex
            }
          }
          bgColor {
            isGradient
            color1 {
              hex
            }
            color2 {
              hex
            }
          }
        }
      }
    }
  }
`;
