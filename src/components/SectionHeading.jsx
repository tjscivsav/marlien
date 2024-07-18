import React from "react";

export default function SectionHeading({ data }) {
  const heading = data?.heading;
  if (heading && heading?.txt) {
    return (
      <div className="flex items-center mt-3 mb-6">
        {heading?.txt && (
          <div
            className="w-full h-[1px] bg-black"
            style={{ backgroundColor: data?.barColor?.hex }}
          />
        )}
        <p
          className="text-black text-center font-medium w-1/2 uppercase px-6 md:text-xl"
          style={{ color: heading?.textColor?.hex }}
        >
          {heading?.txt}
        </p>
        {heading?.txt && (
          <div
            className="w-full h-[1px] bg-black"
            style={{ backgroundColor: data?.barColor?.hex }}
          />
        )}
      </div>
    );
  }
}
