import Image from "gatsby-plugin-sanity-image";
import React from "react";

export default function Poster({ data }) {
  const borderData = data?.border || {};
  const border = {
    borderWidth: borderData?.width,
    borderColor: borderData?.borderColor?.hex,
    borderStyle: "solid",
  };
  return (
    <div id={data?.sectionId} className="pt-6 lb-container layout px-3 md:px-5">
      <a href={data?.link} target="_blank" className="">
        <div className="img-poster-container transition-transform duration-300 hover:translate-y-[5px]">
          <Image
            asset={data?.thumbnail?.asset}
            hotspot={data?.thumbnail?.hotspot}
            crop={data?.thumbnail?.crop}
            alt={data?.thumbnail.alt}
            style={borderData ? border : {}}
            className="object-cover"
          />
        </div>
        {data?.title && (
          <p
            className="text-center text-lg sm:text-xl uppercase font-semibold pt-3"
            style={{ color: data.title?.textColor?.hex }}
          >
            {data.title?.txt}
          </p>
        )}
        {data?.description && (
          <p
            className="text-center text-sm sm:text-base"
            style={{ color: data.description?.textColor?.hex }}
          >
            {data.description?.txt}
          </p>
        )}
      </a>
    </div>
  );
}
