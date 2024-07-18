import Image from "gatsby-plugin-sanity-image";
import React from "react";
import Slider from "react-slick";

function NextArrow(props) {
  const { className, style, onClick, color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, display: "block" }}
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
  const { className, style, onClick, color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, display: "block" }}
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
  const list = data?.list || [];
  const isSqr = data?.isSqr;
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
    slidesToShow: isSqr ? 4 : 5,
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

  const click = (link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "dev",
        link_url: link,
      });
    }
  };

  console.log(list);
  return (
    <div>
      <Slider {...settings}>
        {list.map((item, index) => (
          <div key={index} className="slider-item">
            <a
              href={item.link}
              target="_blank"
              onClick={() => click(item.link)}
            >
              <div
                className={`img-container-3 ${isSqr ? "img-sqr" : "img-vt"}`}
                style={borderData?.enable ? border : {}}
              >
                <Image
                  asset={item?.img?.asset}
                  hotspot={item?.img?.hotspot}
                  crop={item?.img?.crop}
                  alt={item?.img?.alt}
                  className="object-cover"
                />
                <p
                  className="absolute bottom-[10px] left-[15px] right-[10px] z-20 text-white"
                  style={{
                    textAlign: item?.align ? `${item.align}` : "left",
                    color: item.heading?.textColor?.hex,
                  }}
                >
                  {item.heading?.txt}
                </p>
                <div className="overlay" />
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
