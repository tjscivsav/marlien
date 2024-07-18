import React from "react";
import SectionHeading from "../SectionHeading";
import TypeA from "./TypeA";
import TypeB from "./TypeB";

export default function Blogs({ data }) {
  const type = data?.layoutType || "a";
  const sectionHeading = data?.sectionHeading;

  return (
    <div
      id={data?.sectionId}
      className="blogs lb-container layout px-3 md:px-5"
    >
      <SectionHeading data={sectionHeading} />
      <div>{type === "a" ? <TypeA data={data} /> : <TypeB data={data} />}</div>
    </div>
  );
}
