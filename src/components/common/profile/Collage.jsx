import Image from "gatsby-plugin-sanity-image";
import React from "react";
import ToggleButton from "../../Navlinks";
import SocialSmall from "../social/Small";

export default function Collage({ data, bgType, featuredImages }) {
  const { pt } = data;
  const borderData = data?.border || {};
  const border = {
    boxShadow: `0px 0px 0px ${borderData?.width}px ${borderData?.borderColor?.hex}`,
    // borderWidth: borderData?.width,
    // borderColor: borderData?.borderColor?.hex,
    // borderStyle: "solid",
  };

  return (
    <div
      className={`relative w-full max-w-full mx-auto hidden md:flex flex-col justify-center items-center pt-[2px]`}
      style={{ paddingTop: pt ? `${pt}px` : 0 }}
    >
      <div
        className={`relative  w-full overflow-hidden  ${
          bgType === "blur" ? "h-[400px]" : "h-[500px] xl:h-[540px]"
        }`}
        style={borderData?.enable ? border : {}}
      >
        <Image
          asset={data.avatar?.asset}
          hotspot={data.avatar?.hotspot}
          crop={data.avatar?.crop}
          alt={data?.avatar?.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="avatar-bg flex absolute flex-col justify-center items-center pb-5 left-0 right-0 bottom-0">
        <div className="inline-flex relative mt-[15px] items-center">
          <p
            className="text-center text-[32px] 2xl:[40px] font-bold mr-[6px]"
            style={{ color: data.name?.textColor?.hex }}
          >
            {data?.name?.txt}
          </p>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill={"none"}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-[30px] top-[7px]"
          >
            <path
              d="M13.4429 4.32349C14.3401 3.55884 15.6599 3.55884 16.5571 4.32349L18.0833 5.62411C18.4678 5.95179 18.9459 6.14981 19.4495 6.19L21.4484 6.34951C22.6235 6.44329 23.5567 7.37646 23.6505 8.55163L23.81 10.5505C23.8502 11.0541 24.0482 11.5322 24.3759 11.9167L25.6765 13.4429C26.4412 14.3401 26.4412 15.6599 25.6765 16.5571L24.3759 18.0833C24.0482 18.4678 23.8502 18.9459 23.81 19.4495L23.6505 21.4484C23.5567 22.6235 22.6235 23.5567 21.4484 23.6505L19.4495 23.81C18.9459 23.8502 18.4678 24.0482 18.0833 24.3759L16.5571 25.6765C15.6599 26.4412 14.3401 26.4412 13.4429 25.6765L11.9167 24.3759C11.5322 24.0482 11.0541 23.8502 10.5505 23.81L8.55163 23.6505C7.37646 23.5567 6.44329 22.6235 6.34951 21.4484L6.19 19.4495C6.14981 18.9459 5.95179 18.4678 5.62411 18.0833L4.32349 16.5571C3.55884 15.6599 3.55884 14.3401 4.32349 13.4429L5.62411 11.9167C5.95179 11.5322 6.14981 11.0541 6.19 10.5505L6.34951 8.55163C6.44329 7.37646 7.37646 6.44329 8.55163 6.34951L10.5505 6.19C11.0541 6.14981 11.5322 5.95179 11.9167 5.62411L13.4429 4.32349Z"
              stroke={data?.checkColor ? data.checkColor.hex : "#8750DF"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.75 12.5L13.75 17.5L11.25 15"
              stroke={data?.checkColor ? data.checkColor.hex : "#8750DF"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <a
          href={data.nameLink}
          target="_blank"
          className="text-base 2xl:text-xl"
          style={{ color: data?.username?.textColor?.hex }}
        >
          {data.username?.txt}
        </a>
        <SocialSmall data={data?.socialList || []} />
        <ToggleButton links={data?.navLinks} />
      </div>
    </div>
  );
}
