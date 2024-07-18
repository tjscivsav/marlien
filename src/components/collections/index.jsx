import React from "react";
import SectionHeading from "../SectionHeading";
import TypeA from "./TypeA";
import TypeB from "./TypeB";
import TypeC from "./TypeC";

export default function Collection({ data }) {
  const type = data?.layoutType || "a";
  const sectionHeading = data?.sectionHeading;

  return (
    <div
      id={data?.sectionId}
      className="collections lb-container layout px-3 md:px-5"
    >
      <SectionHeading data={sectionHeading} />
      <div>
        {type === "b" ? (
          <TypeB data={data} />
        ) : type === "c" ? (
          <TypeC data={data} />
        ) : (
          <TypeA data={data} />
        )}
      </div>
    </div>
  );
}
