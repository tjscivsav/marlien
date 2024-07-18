import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeading from "./SectionHeading";

export default function Twittes() {
  return (
    <div className="collections">
      <SectionHeading heading={"Tweets"} />
      <div>
        <div className="b-card">
          <StaticImage src="../images/t.png" alt="twite" objectFit="contain" />
        </div>
        <div className="b-card">
          <StaticImage src="../images/t.png" alt="twite" objectFit="contain" />
        </div>
        <div className="b-card">
          <StaticImage src="../images/t.png" alt="twite" objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
