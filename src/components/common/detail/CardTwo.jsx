import Image from "gatsby-plugin-sanity-image";
import React from "react";

export default function CardTwo({ data, border }) {
  const bgData = data?.bg;
  const click = (link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "dev",
        link_url: link,
      });
    }
  };

  return (
    <a href={data?.link} target="_blank" onClick={() => click(data.link)}>
      <div
        className="py-0 px-10 h-[100px] justify-between transition-all duration-300 bg-white rounded-3xl border border-[#ccc] flex items-center hover:scale-105"
        style={{
          background: bgData?.bgType
            ? bgData?.bgType === "image"
              ? `url(${bgData?.bg?.asset?.url}?w=1000&h=600&auto=format) no-repeat`
              : bgData?.bgColor?.isGradient
              ? `linear-gradient(to right,${bgData?.bgColor?.color1?.hex},${bgData?.bgColor?.color2?.hex})`
              : `${bgData?.bgColor?.color1?.hex}`
            : "",
          backgroundSize: "cover",
          borderWidth: border?.enable ? border?.width : "",
          borderColor: border?.enable ? border?.borderColor?.hex : "",
          borderStyle: border?.enable ? "solid" : "",
        }}
      >
        <p
          className="text-xl font-medium uppercase leading-[30px] mr-2"
          style={{ color: data?.title?.textColor?.hex }}
        >
          {data?.title?.txt}
        </p>
        {data?.imgType ? (
          data.imgType === "svg" ? (
            <div dangerouslySetInnerHTML={{ __html: data?.svg }}></div>
          ) : (
            <div className="item-image-container">
              <Image
                asset={data?.img?.asset}
                hotspot={data?.img?.hotspot}
                crop={data?.img?.crop}
                alt={data?.title?.txt}
                className="object-cover"
              />
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </a>
  );
}
