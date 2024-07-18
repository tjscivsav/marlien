import Image from "gatsby-plugin-sanity-image";
import React, { useState } from "react";

export default function TypeA({ data }) {
  const blogs = data.blogList || [];
  const borderData = data?.border || {};

  const bgColor = `rgba(${data.bgColor.rgb.r},${data.bgColor.rgb.g},${data.bgColor.rgb.b},${data.bgColor.rgb.a})`;
  const bgHoverColor = `rgba(${data.bgHoverColor.rgb.r},${data.bgHoverColor.rgb.g},${data.bgHoverColor.rgb.b},${data.bgHoverColor.rgb.a})`;
  return (
    <div>
      {blogs.map((item, index) => {
        return (
          <BlogItem
            item={item}
            bgColor={bgColor}
            bgHoverColor={bgHoverColor}
            borderData={borderData}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
}

export function BlogItem({ item, bgColor, bgHoverColor, borderData, index }) {
  const [hover, setHover] = useState(false);

  const click = (link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "main",
        link_url: link,
      });
    }
  };
  return (
    <a
      href={item.link}
      target="_blank"
      key={index}
      className="block mb-3"
      onClick={() => click(item.link)}
    >
      <div
        className={`b-card group flex md:items-center flex-col md:flex-row p-[13px] rounded-3xl transition-all duration-500 shadow-[0_3px_3px_0px_rgba(0,0,0,0.04)] hover:translate-x-2`}
        style={
          borderData?.enable
            ? {
                borderWidth: borderData?.width,
                borderColor: borderData?.borderColor?.hex,
                borderStyle: "solid",
                background: hover ? bgHoverColor : bgColor,
              }
            : {
                backgroundColor: hover ? bgHoverColor : bgColor,
              }
        }
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="">
          <div className="img-container-4">
            <Image
              asset={item.thumbnail?.asset}
              hotspot={item.thumbnail?.hotspot}
              crop={item.thumbnail?.crop}
              alt={item?.thumbnail?.alt}
              className="object-cover"
            />
            <img
              src={`${item?.thumbnail?.asset.url}?w=550&auto=format`}
              alt={item?.thumbnail?.alt}
              className="normal-img"
              width={580}
              height={200}
            />
          </div>
        </div>
        <div className="md:ml-[34px]">
          <h1
            className="mt-[10px] sm:mt-0 text-black text-xl font-medium leading-normal transition-colors duration-500 group-hover:!text-white"
            style={{ color: item.title?.textColor?.hex }}
          >
            {item.title.txt}
          </h1>
          <p
            className="text-[#5b5b5b] text-base transition-colors duration-500 group-hover:!text-white"
            style={{ color: item.description?.textColor?.hex }}
          >
            {item.description?.txt}
          </p>
        </div>
      </div>
    </a>
  );
}
