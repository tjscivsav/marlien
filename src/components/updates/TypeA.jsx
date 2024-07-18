import Image from "gatsby-plugin-sanity-image";
import React from "react";
import youtubeImg from "../../images/youtube.png";

export default function Updates({ data }) {
  const borderData = data?.border || {};
  const border = {
    borderWidth: borderData?.width,
    borderColor: borderData?.borderColor?.hex,
    borderStyle: "solid",
  };
  const click = (link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "dev",
        link_url: link,
      });
    }
  };
  return (
    <div className="updates">
      <div
        className={`grid gap-3 ${
          data?.twoCol ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {data.list?.map((item, index) => {
          return (
            <div
              className="flex flex-col pb-4 rounded-3xl bg-[rgba(250,250,250,0.4)] shadow-[0_3px_3px_0px_rgba(0,0,0,0.04)] mx-auto overflow-hidden w-full sm:w-[90%]"
              key={index}
              style={borderData?.enable ? border : {}}
            >
              <div>
                <div className="group">
                  <a
                    href={item.link}
                    target="_blank"
                    onClick={() => click(item.link)}
                  >
                    <div className="img-container-5">
                      <Image
                        asset={item?.img?.asset}
                        hotspot={item?.img?.hotspot}
                        crop={item?.img?.crop}
                        alt={item?.img?.alt}
                        className=" object-cover"
                      />
                      <img
                        src={`${item?.img?.asset.url}?w=550&auto=format`}
                        alt={item?.img?.alt}
                        className="normal-img"
                        width={580}
                        // height={210}
                      />
                      {data.enableIcon && (
                        <div className="absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center">
                          <img
                            src={youtubeImg}
                            alt="play-icon"
                            className="w-[68px] h-[47px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        </div>
                      )}
                    </div>
                  </a>
                </div>
                <p
                  className="text-xl p-5"
                  style={{
                    textAlign: item?.align ? `${item?.align}` : "left",
                    color: item.title.textColor.hex,
                  }}
                >
                  {item.title?.txt}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
