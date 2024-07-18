import React, { useState } from "react";
import { Link } from "react-scroll";
const ToggleButton = ({ links }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`flex flex-col sm:flex-row ${
        isActive ? "justify-center" : "justify-start"
      } items-center relative transition-all duration-300 ease-linear h-auto sm:h-6 mt-5`}
    >
      <div
        className="w-6 h-6 cursor-pointer flex items-center justify-center"
        onClick={() => setIsActive(!isActive)}
      >
        {/* Icon */}
        <div className={`flex justify-center items-center`}>
          <div
            className={`absolute bg-white h-[2px] w-6 transform transition-transform duration-300 ${
              isActive ? "rotate-45" : ""
            }`}
          ></div>
          {/* Vertical Line. Hidden in "plus" state, rotated 90 degrees in "close" state */}
          <div
            className={`absolute bg-white w-[2px] h-6 transform transition-transform duration-300 ${
              isActive ? "rotate-45" : ""
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`w-[95%] sm:w-full flex flex-wrap justify-center sm:justify-normal my-4 sm:my-0 gap-2 transition-all duration-300 text-base sm:text-xl ${
          isActive ? "opacity-100 visible" : "opacity-0 invisible "
        } ${isActive ? "-ml-4 sm:ml-4" : "absolute left-full"}`}
      >
        {links?.map((link, key) => {
          if (link.linkType === "sectionId") {
            return (
              <Link
                key={key}
                className="text-white clear-both whitespace-nowrap inline-block overflow-hidden"
                to={link.sectionId}
                smooth={true}
                duration={500}
              >
                {link.title}
              </Link>
            );
          } else {
            return (
              <a
                key={key}
                className="text-white clear-both whitespace-nowrap inline-block overflow-hidden"
                href={link.url}
                target="_blank"
              >
                {link.title}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ToggleButton;
