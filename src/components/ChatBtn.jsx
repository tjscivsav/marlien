import React, { useEffect, useState } from "react";
import { formatPhone } from "../utils/common";
import Chatbot from "./Chatbot";

export default function ChatBtn({ data }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scriptLoading, setSecriptLoading] = useState(true);
  const [aiLoaded, setAiLoaded] = useState(false);
  const [final, setFinal] = useState(true);
  const {
    btnText,
    btnBg,
    btnType,
    btnUrl,
    subscribeBy,
    border,
    enable,
    botColor,
    botName,
    des,
    avatar,
  } = data;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecriptLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // This is for extra time to inject the script in dom
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinal(false);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (document.getElementById("email-popup")) {
      if (popup) {
        document.getElementById("email-popup").style.visibility = "visible";
        document.getElementById("email-popup").style.opacity = "1";
      } else {
        document.getElementById("email-popup").style.opacity = "0";

        setTimeout(() => {
          document.getElementById("email-popup").style.visibility = "hidden";
        }, 500);
      }
    }
  }, [popup]);

  useEffect(() => {
    if (aiLoaded) {
      setTimeout(() => {
        document
          .querySelector("#voiceflow-chat")
          ?.shadowRoot.querySelector(".vfrc-launcher")
          ?.setAttribute("style", "opacity:0");
      }, 500);
    }
  }, [aiLoaded]);

  const onOpen = () => {
    if (btnType === "chatbot") {
      const e = localStorage.getItem("@chatbot-email");
      if (e) {
        if (aiLoaded) {
          window.voiceflow.chat.open();
          return;
        }
        window?.voiceflow?.chat
          .load({
            verify: { projectID: "6572ef6ae8da52daff168066" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            assistant: {
              title: botName,
              description: des,
              image: avatar?.asset?.url,
              avatar: avatar?.asset?.url,
              color: botColor?.hex,
            },
          })
          .then(() => {
            window.voiceflow.chat.open();
            setAiLoaded(true);
          });
      } else {
        setPopup(true);
      }
    } else if (btnType === "subscribe") {
      setPopup(true);
    }
  };

  const openUrl = () => {
    if (typeof window !== "undefined") {
      window.open(btnUrl, "_blank");
    }
  };
  const onClose = () => {
    setPopup(false);
    setLoading(false);
    setEmail("");
  };

  const handlePhoneInput = (e) => {
    const formattedPhoneNumber = formatPhone(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const d = {
      data: {
        email: email,
        phone: phone,
        date: new Date().toUTCString(),
        website: window.location.origin,
      },
      sheetID: 18,
    };
    setLoading(true);
    fetch("https://leads.civsav.com/template/contact", {
      method: "POST",
      body: JSON.stringify(d),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        if (btnType === "chatbot") {
          localStorage.setItem("@chatbot-email", `${email}`);
          window?.voiceflow?.chat
            .load({
              verify: { projectID: "6572ef6ae8da52daff168066" },
              url: "https://general-runtime.voiceflow.com",
              versionID: "production",
              assistant: {
                title: botName,
                description: des,
                image: avatar?.asset?.url,
                avatar: avatar?.asset?.url,
                color: botColor?.hex,
              },
            })
            .then(() => {
              window.voiceflow.chat.open();
              setAiLoaded(true);
            });
        }
        setLoading(false);
        onClose();
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong! Please try again");
      });
  };

  return (
    <>
      <div id={data?.sectionId} className="flex justify-center py-5 px-[10px]">
        {btnType === "url" ? (
          <button
            style={{
              background: btnBg?.bgType
                ? btnBg?.bgType === "image"
                  ? `url(${btnBg?.bg?.asset?.url}?w=1000&h=600&auto=format) no-repeat`
                  : btnBg?.bgColor?.isGradient
                  ? `linear-gradient(to right,${btnBg?.bgColor?.color1?.hex},${btnBg?.bgColor?.color2?.hex})`
                  : `${btnBg?.bgColor?.color1?.hex}`
                : "transparent",
              backgroundSize: "cover",
              borderWidth: border?.enable ? border?.width : "",
              borderColor: border?.enable ? border?.borderColor?.hex : "",
              borderStyle: "solid",
              color: btnText?.textColor?.hex,
            }}
            onClick={openUrl}
            className="max-w-[430px] w-full p-[18px] text-xl font-bold rounded-3xl cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {btnText?.txt}
          </button>
        ) : (
          <button
            style={{
              background: btnBg?.bgType
                ? btnBg?.bgType === "image"
                  ? `url(${btnBg?.bg?.asset?.url}?w=1000&h=600&auto=format) no-repeat`
                  : btnBg?.bgColor?.isGradient
                  ? `linear-gradient(to right,${btnBg?.bgColor?.color1?.hex},${btnBg?.bgColor?.color2?.hex})`
                  : `${btnBg?.bgColor?.color1?.hex}`
                : "transparent",
              backgroundSize: "cover",
              borderWidth: border?.enable ? border?.width : "",
              borderColor: border?.enable ? border?.borderColor?.hex : "",
              borderStyle: "solid",
              color: btnText?.textColor?.hex,
            }}
            onClick={onOpen}
            disabled={btnType === "chatbot" ? final : false}
            className="max-w-[430px] w-full p-[18px] text-xl font-bold rounded-3xl cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {btnType === "chatbot" && final
              ? "Chatbot Loading..."
              : btnText?.txt}
          </button>
        )}

        {/* Email popup */}
        {popup && (
          <div className="popup" id="email-popup">
            <div className="email-inner">
              {btnType === "chatbot" ? (
                <div>
                  {subscribeBy === "email" && (
                    <h1>Please enter your email for chat</h1>
                  )}
                  {subscribeBy === "phone" && (
                    <h1>Please enter your phone number for chat</h1>
                  )}
                  {subscribeBy === "both" && (
                    <h1>Please enter your email and phone number for chat</h1>
                  )}
                </div>
              ) : (
                <div>
                  {subscribeBy === "email" && <h1>Please enter your email</h1>}
                  {subscribeBy === "phone" && (
                    <h1>Please enter your phone number</h1>
                  )}
                  {subscribeBy === "both" && (
                    <h1>Please enter your email and phone number</h1>
                  )}
                </div>
              )}{" "}
              <form onSubmit={onSubmit}>
                {(subscribeBy === "email" || subscribeBy === "both") && (
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
                {(subscribeBy === "phone" || subscribeBy === "both") && (
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    placeholder="Enter your phone number (111) 111-1111"
                    onChange={handlePhoneInput}
                    className="mt-3"
                  />
                )}

                <button type="submit" disabled={loading}>
                  Submit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className={`${loading ? "arrow-right" : ""}`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </button>
              </form>
              <span onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#777"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
      {!scriptLoading && enable && <Chatbot />}
    </>
  );
}
