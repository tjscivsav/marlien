import React, { useEffect } from "react";

export default function Chatbot({ onClose, value, data }) {
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

  return (
    <div className={`popup`} id="popup">
      <div className="chatbot">
        <div className={``}>
          {/* <h1 style={{ color: title?.textColor?.hex }}>{title?.txt}</h1> */}
        </div>
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
