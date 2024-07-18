import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        siteUrl: siteUrl
      }
    }
  }
`;
function Seo({ children, location, data, favicon }) {
  const { site } = useStaticQuery(query);

  const { defaultTitle, defaultDescription, siteUrl } = site.siteMetadata;
  const seo = {
    title: data?.title || defaultTitle,
    description: data?.description || defaultDescription,
    url: `${siteUrl}${location?.pathname}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      {favicon && (
        <link rel="icon" type="image/x-icon" href={favicon.asset.url}></link>
      )}
      <meta name="description" content={seo.description} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      {seo?.url && <meta property="og:url" content={seo.url} />}
      {seo?.title && <meta property="og:title" content={seo.title} />}
      {seo?.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <meta property="og:site_name" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      {seo?.title && <meta name="twitter:title" content={seo.title} />}
      {seo?.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {data?.keywords?.length > 0 && (
        <meta name="keywords" content={data.keywords.join(",")} />
      )}
      {children}
    </>
  );
}

export default Seo;
