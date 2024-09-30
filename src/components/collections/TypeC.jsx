import Image from "gatsby-plugin-sanity-image";
import React from "react";

const TypeC = ({ data }) => {
  const list = data?.list || [];
  const borderData = data?.border || {};
  const border = {
    borderWidth: borderData?.width,
    borderColor: borderData?.borderColor?.hex,
    borderStyle: "solid",
  };

  const onClick = (title, link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "position_ranking", {
        section_name: "Product",
        link_text: title,
        url: link,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {list.map((item, index) => (
        <div
          key={index}
          className="bg-[#eee] rounded-2xl transition-shadow duration-500 cursor-pointer group hover:shadow-xl"
          style={borderData?.enable ? border : {}}
        >
          <div className="bg-[#dedddd] relative rounded-2xl overflow-hidden">
            <a
              href={item.link}
              target="_blank"
              onClick={() => onClick(item.heading?.txt, item.link)}
            >
              <Image
                asset={item?.img?.asset}
                hotspot={item?.img?.hotspot}
                crop={item?.img?.crop}
                alt={item?.img?.alt}
                className="h-full w-full aspect-square"
                loading="lazy"
              />
            </a>
            <a
              className="flex items-center text-xs md:text-sm justify-center left-0 right-0 z-10 bottom-0 absolute uppercase bg-blue-300 py-1 md:py-2 transition-all duration-500 md:translate-y-14 opacity-70 md:opacity-100 md:group-hover:translate-y-0 md:hover:text-white md:hover:bg-[#25ABE2]"
              href={item.link}
              target="_blank"
              onClick={() => onClick(item.heading?.txt, item.link)}
              //   onClick={() =>
              //     itemToCart(variant ? variant : store?.variants[0].store.gid)
              //   }
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg> */}
              View Product
            </a>
          </div>
          <div className="p-3">
            <a
              href={item.link}
              target="_blank"
              onClick={() => onClick(item.heading?.txt, item.link)}
            >
              <p
                className="font-normal text-base hover:underline"
                style={{
                  textAlign: item?.align ? `${item.align}` : "left",
                  color: item.heading?.textColor?.hex,
                }}
              >
                {item.heading?.txt}
              </p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypeC;
