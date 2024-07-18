import Image from "gatsby-plugin-sanity-image";
import React from "react";
import Slider from "react-slick";
import { useWindowSize } from "../../hooks/windowSize";
import { truncateString } from "../../utils/common";

function NextArrow(props) {
  const { style, onClick, color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
      className="absolute right-0 -top-8 cursor-pointer"
      onClick={onClick}
    >
      <path
        d="M9 19L16 12L9 5"
        stroke={color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrevArrow(props) {
  const { style, onClick, color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-7 -top-8 cursor-pointer"
      style={{ ...style }}
      onClick={onClick}
    >
      <path
        d="M15 19L8 12L15 5"
        stroke={color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TypeA({ data }) {
  const { width } = useWindowSize();
  const blogs = data.blogList || [];
  const borderData = data?.border || {};
  const border = {
    borderWidth: borderData?.width,
    borderColor: borderData?.borderColor?.hex,
    borderStyle: "solid",
  };
  var settings = {
    dots: false,
    className: "center",
    centerMode: width > 800 ? true : false,
    // infinite: false,
    centerPadding: "120px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow color={data?.arrowColor?.hex} />,
    prevArrow: <PrevArrow color={data?.arrowColor?.hex} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <div className="mt-12">
      {width > 0 && (
        <Slider {...settings}>
          {blogs.map((item, index) => (
            <div key={index} className="md:pr-10">
              <a
                href={item.link}
                target="_blank"
                key={index}
                className="block"
                onClick={() => click(item.link)}
              >
                <div
                  className="flex flex-col w-full lg:flex-row rounded-xl overflow-hidden"
                  style={borderData?.enable ? border : {}}
                >
                  <div className="h-[180px] lg:h-[150px] w-full lg:w-[200px]">
                    <Image
                      asset={item.thumbnail?.asset}
                      hotspot={item.thumbnail?.hotspot}
                      crop={item.thumbnail?.crop}
                      alt={item?.thumbnail?.alt}
                      className="h-[180px] lg:h-[150px] w-full lg:w-[200px] object-cover"
                    />
                  </div>

                  <div className="p-5 backdrop-blur-md rounded-xl w-full">
                    <h1
                      className="mt-[10px] sm:mt-0 text-black text-xl font-medium leading-normal transition-colors duration-500 group-hover:text-white text-ellipsis"
                      style={{ color: item.title?.textColor?.hex }}
                    >
                      {truncateString(item.title.txt, 20)}
                    </h1>
                    <p
                      className="text-[#5b5b5b] text-base transition-colors duration-500 group-hover:!text-white text-ellipsis"
                      style={{ color: item.description?.textColor?.hex }}
                    >
                      {truncateString(item.description?.txt, 50)}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
