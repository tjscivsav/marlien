import React from "react";

export default function Title({ data }) {
  return (
    <div
      className="pt-5 lb-container layout px-3 md:px-5"
      style={{
        textAlign: data?.align ? `${data.align}` : "center",
      }}
    >
      {data?.sectionHeading?.txt && (
        <h3
          className="text-xl md:text-2xl font-bold"
          style={{ color: data.sectionHeading.textColor.hex }}
        >
          {data.sectionHeading?.txt}
        </h3>
      )}
    </div>
  );
}
