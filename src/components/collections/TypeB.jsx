import Image from "gatsby-plugin-sanity-image";
import React from "react";
import Slider from "react-slick";

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

export default function TypeB({ data }) {
  const list = data?.list || [];
  const borderData = data?.border || {};
  const border = {
    borderWidth: borderData?.width,
    borderColor: borderData?.borderColor?.hex,
    borderStyle: "solid",
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow color={data?.arrowColor?.hex} />,
    prevArrow: <PrevArrow color={data?.arrowColor?.hex} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const click = (title, link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "dev",
        link_url: link,
      });

      // window.gtag("event", "position_ranking", {
      //   section_name: "Product",
      //   link_text: title,
      //   url: link,
      // });
    }

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "position_ranking",
        section_name: "Product",
        link_text: title,
        url: link,
      });
    }
  };
  return (
    <div className="mt-10">
      <Slider {...settings}>
        {list.map((item, index) => (
          <div key={index} className="slider-item">
            <a
              href={item.link}
              target="_blank"
              onClick={() => click(item.heading?.txt, item.link)}
              className="block rounded-[17px] overflow-hidden mx-2"
              style={borderData?.enable ? border : {}}
            >
              <div
                className={`h-[160px] rounded-[17px] relative overflow-hidden`}
              >
                <Image
                  asset={item?.img?.asset}
                  hotspot={item?.img?.hotspot}
                  crop={item?.img?.crop}
                  alt={item?.img?.alt}
                  objectFit="cover"
                  className="h-[160px] object-cover overflow-hidden z-0 rounded-[17px]"
                />
              </div>
              <p
                className="relative rounded-[17px] px-4 pt-2 pb-2 text-lg font-medium  text-white "
                style={{
                  textAlign: item?.align ? `${item.align}` : "left",
                  color: item.heading?.textColor?.hex,
                }}
              >
                {item.heading.txt}
              </p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
