import React from "react";
import Collage from "./Collage";
import Large from "./Large";
import Small from "./Small";

export default function Profile({ data, bg, featuredGallery }) {

  console.log(data)
  return (
    <div>
      {data?.isLarge ? (
        <div>
          <Collage data={data} bgType={bg} />
          <Large data={data} bgType={bg} />
        </div>
      ) : (
        <Small data={data} bgType={bg} />
      )}
    </div>
  );
}
