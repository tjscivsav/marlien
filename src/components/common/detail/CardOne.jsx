import React from "react";
// import { GatsbyImage } from "gatsby-plugin-image";

export default function CardOne({ title, description }) {
  return (
    <div>
      <h1
        className="text-xl font-bold text-center uppercase"
        style={{ color: title.textColor.hex }}
      >
        {title?.txt}
      </h1>
      <p
        className="text-base font-medium text-center"
        style={{ color: description.textColor.hex }}
      >
        {description?.txt}
      </p>
    </div>
  );
}
