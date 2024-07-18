import Image from "gatsby-plugin-sanity-image";
import React, { useEffect } from "react";

export default function Popup({ onClose, value, data }) {
  const {
    title,
    description,
    bg,
    twoCol,
    border,
    btnText,
    btnBorder,
    btnBg,
    align,
  } = data;

  useEffect(() => {
    if (value) {
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("popup").style.opacity = "1";
    } else {
      document.getElementById("popup").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("popup").style.visibility = "hidden";
      }, 500);
    }
  }, [value]);
  const click = (link) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        branch: "dev",
        link_url: link,
      });
    }
  };
  return (
    <div className={`popup ${!twoCol ? "single-col" : ""}`} id="popup">
      <div className="inner">
        <div
          className={`text-container ${!twoCol ? "container-center" : ""}`}
          style={{
            background: bg?.bgType
              ? bg?.bgType === "image"
                ? `url(${bg?.bg?.asset?.url}?w=1000&h=600&auto=format) no-repeat`
                : bg?.bgColor?.isGradient
                ? `linear-gradient(to right,${bg?.bgColor?.color1?.hex},${bg?.bgColor?.color2?.hex})`
                : `${bg?.bgColor?.color1?.hex}`
              : "",
            backgroundSize: "cover",
            borderWidth: bg?.border?.enable ? bg?.border?.width : "",
            borderColor: bg?.border?.enable ? bg?.border?.borderColor?.hex : "",
            borderStyle: "solid",
          }}
        >
          <h1
            style={{ color: title?.textColor?.hex, textAlign: align ?? "left" }}
          >
            {title?.txt}
          </h1>
          {description?.txt && (
            <p
              style={{
                color: description?.textColor?.hex,
                textAlign: align ?? "left",
              }}
            >
              {description.txt}
            </p>
          )}
          {btnText?.txt && (
            <a
              href={data.btnUrl}
              target="_blank"
              className="btn"
              onClick={() => click(data.btnUrl)}
              style={{
                background: btnBg?.bgType
                  ? btnBg?.bgType === "image"
                    ? `url(${btnBg?.bg?.asset?.url}?w=1000&h=600&auto=format) no-repeat`
                    : btnBg?.bgColor?.isGradient
                    ? `linear-gradient(to right,${btnBg?.bgColor?.color1?.hex},${btnBg?.bgColor?.color2?.hex})`
                    : `${btnBg?.bgColor?.color1?.hex}`
                  : "transparent",
                backgroundSize: "cover",
                borderWidth: btnBorder?.enable ? btnBorder?.width : "",
                borderColor: btnBorder?.enable
                  ? btnBorder?.borderColor?.hex
                  : "",
                borderStyle: "solid",
                color: btnText?.textColor?.hex,
              }}
            >
              {btnText.txt}
            </a>
          )}
        </div>
        {twoCol && (
          <div
            className="img-container"
            style={{
              borderWidth: border?.enable ? border?.width : "",
              borderColor: border?.enable ? border?.borderColor?.hex : "",
              borderStyle: "solid",
            }}
          >
            <Image
              asset={data?.img?.asset}
              crop={data?.img?.crop}
              hotspot={data?.img?.hotspot}
              alt={data?.img.alt}
              className="object-cover"
            />
          </div>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="white"
        viewBox="0 0 16 16"
        onClick={onClose}
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </div>
  );
}
