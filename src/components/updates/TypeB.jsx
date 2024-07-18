import React from "react";
import Slider from "react-slick";
import youtubeImg from "../../images/youtube.png";

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
      className="absolute right-0 -top-11 cursor-pointer"
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
      className="absolute right-7 -top-11 cursor-pointer"
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
  const blogs = data.blogList || [];
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
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow color={data?.arrowColor?.hex} />,
    prevArrow: <PrevArrow color={data?.arrowColor?.hex} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
      <Slider {...settings}>
        {data.list?.map((item, index) => {
          return (
            <div key={index}>
              <div
                className="relative group shadow-[0_3px_3px_0px_rgba(0,0,0,0.04)] mx-3 rounded-3xl overflow-hidden"
                style={borderData?.enable ? border : {}}
              >
                <a
                  href={item.link}
                  target="_blank"
                  onClick={() => click(item.link)}
                >
                  <div className="rounded-3xl overflow-hidden relative">
                    <img
                      src={item?.img?.asset?.url}
                      alt={item?.img?.alt}
                      objectFit="cover"
                      className="w-full z-0 overflow-hidden"
                    />
                    <div className=" absolute top-0 left-0 bottom-0 right-0 bg-black/35 z-10 rounded-3xl overflow-hidden" />
                    {data.enableIcon && (
                      <div className="absolute z-20 left-0 right-0 bottom-0 top-0 flex justify-center items-center">
                        <img
                          src={youtubeImg}
                          alt="play-icon"
                          className="w-[68px] h-[47px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                    )}
                    <p
                      className={`absolute left-3 right-3 z-30 text-xl p-5 font-semibold ${
                        item.alignY === "top" && "top-0"
                      } ${
                        item.alignY === "center" && "top-1/2 -translate-y-1/2"
                      } ${item.alignY === "bottom" && "bottom-0"} ${
                        !item.alignY && "top-0"
                      }`}
                      style={{
                        textAlign: item?.align ? `${item?.align}` : "left",
                        color: item.title.textColor.hex,
                      }}
                    >
                      {item.title.txt}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
