import React from "react";
import CardOne from "./CardOne";
import CardTwo from "./CardTwo";

export default function Detail({ data }) {
  const borderData = data?.border || {};

  return (
    <div
      id={data?.sectionId}
      className={`detail pt-5 lb-container layout px-3 md:px-5sss`}
    >
      <CardOne title={data?.heading} description={data?.description} />
      {data?.detailList?.length > 0 && (
        <div
          className={`${
            data.detailList.length === 1
              ? "flex justify-center"
              : "grid grid-cols-1 lg:grid-cols-2"
          }  gap-[16px] mt-4 overflow-hidden`}
        >
          {data?.detailList.map((item, index) => (
            <CardTwo key={index} data={item} border={borderData} />
          ))}
        </div>
      )}
    </div>
  );
}
