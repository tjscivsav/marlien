import Image from "gatsby-plugin-sanity-image";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import ReactPlayerVimeo from "react-player/vimeo";
import ReactPlayerYoutube from "react-player/youtube";
import { Link } from "react-scroll";
import { useWindowSize } from "../hooks/windowSize";
import { formatPhone } from "../utils/common";
import SectionHeading from "./SectionHeading";

// const OPTIONS = {
//   threshold: 0,
//   rootMargin: "0px",
// };

const breakpointColumnsObj = {
  default: 2,
  640: 1,
};
const breakpointColumnsObjMob = {
  default: 1,
};

const breakpointColumnsObj2 = {
  default: 3,
  640: 1,
};

export function DivContainer({
  imgLink,
  children,
  cls,
  linkType,
  sectionId,
  title,
}) {
  const onClick = ({ link }) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "position_ranking", {
        link_text: title,
        url: link,
      });
    }
  };
  if (linkType === "sectionId") {
    return (
      <Link
        className={`${cls}`}
        to={sectionId}
        smooth={true}
        duration={500}
        onClick={() => onClick(sectionId)}
      >
        {children}
      </Link>
    );
  }
  if (linkType !== "sectionId" && imgLink) {
    return (
      <a
        className={`${cls}`}
        href={imgLink}
        target="_blank"
        onClick={() => onClick(imgLink)}
      >
        {children}
      </a>
    );
  } else {
    return <div className={cls}>{children}</div>;
  }
}

export default function Gallery({ data }) {
  const { width } = useWindowSize();
  const sectionHeading = data?.sectionHeading;
  const list = data?.assetList || [];
  const border = data?.border;
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState(data?.isBlur ? data.isBlur : false);

  useEffect(() => {
    if (document.getElementById("email-popup-2")) {
      if (popup) {
        document.getElementById("email-popup-2").style.visibility = "visible";
        document.getElementById("email-popup-2").style.opacity = "1";
      } else {
        document.getElementById("email-popup-2").style.opacity = "0";

        setTimeout(() => {
          document.getElementById("email-popup-2").style.visibility = "hidden";
        }, 500);
      }
    }
  }, [popup]);

  // Intersection observer
  //   useEffect(() => {
  //     const sliders = document.querySelectorAll(".gallery-asset");

  //     const appearOnScroll = new IntersectionObserver(function (
  //       entries,
  //       appearOnScroll
  //     ) {
  //       entries.forEach((entry) => {
  //         if (!entry.isIntersecting) {
  //           console.log("====Removed===");
  //           entry.target.classList.remove("fadeIn");
  //         } else {
  //           console.log("====added===");
  //           entry.target.classList.add("fadeIn");
  //         //   appearOnScroll.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     OPTIONS);
  //     sliders.forEach((slider) => {
  //       appearOnScroll.observe(slider);
  //     });
  //   }, []);

  const onOpen = () => {
    const e = localStorage.getItem("@gallery-email");
    if (e) {
      setBlur(false);
    } else {
      setPopup(true);
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
        localStorage.setItem("@gallery-email", `${email}`);
        setLoading(false);
        setBlur(false);
        onClose();
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong! Please try again");
      });
  };

  return (
    <>
      <div
        id={data?.sectionId}
        className={
          data.layoutType === "full-width"
            ? ""
            : "lb-container layout px-3 md:px-5"
        }
      >
        <SectionHeading data={sectionHeading} />
        {data?.optionalHeading && (
          <p
            className="text-lg font-semibold text-center pb-4 uppercase"
            style={{ color: data.optionalHeading.textColor.hex }}
          >
            {data?.optionalHeading?.txt}
          </p>
        )}
        <div className="block md:hidden">
          <Masonry
            breakpointCols={breakpointColumnsObjMob}
            className="my-masonry-grid"
            columnClassName={
              data.layoutType === "full-width" ? "" : "my-masonry-grid_column"
            }
          >
            {data?.assetList.map((item, index) => {
              if (item.enable) {
                return (
                  <div key={index} className="cursor-pointer gallery-asset">
                    <InView>
                      {({ inView, ref }) => (
                        <>
                          <div
                            ref={ref}
                            style={{
                              filter: blur ? `blur(${data?.blur}px)` : "",
                            }}
                          >
                            {blur && (
                              <div
                                className="absolute top-0 left-0 right-0 bottom-0 z-50 w-full h-full"
                                onClick={onOpen}
                              />
                            )}
                            {item?.graphicType === "image" ? (
                              <DivContainer
                                imgLink={item?.imgLink}
                                linkType={item?.linkType}
                                sectionId={item?.sectionId}
                                title={item?.title?.txt}
                                cls={`overflow-hidden aspect-square cursor-pointer relative w-full h-full block ${
                                  data.layoutType !== "full-width" &&
                                  "rounded-[20px]"
                                }`}
                              >
                                <Image
                                  asset={item?.image?.asset}
                                  crop={item?.image?.crop}
                                  hotspot={item.image.hotspot}
                                  alt="gallery-img"
                                  className={`w-full aspect-square z-0 overflow-hidden object-cover ${
                                    data.layoutType !== "full-width" &&
                                    "rounded-[20px]"
                                  }`}
                                  style={{
                                    borderWidth: border?.enable
                                      ? border?.width
                                      : "",
                                    borderColor: border?.enable
                                      ? border?.borderColor?.hex
                                      : "",
                                    borderStyle: border?.enable
                                      ? "solid"
                                      : "none",
                                  }}
                                />
                                {item?.title?.txt && (
                                  <div
                                    className={`absolute inset-0 w-full h-full ${
                                      data.layoutType !== "full-width" &&
                                      "rounded-[20px]"
                                    }`}
                                    style={{
                                      borderWidth: border?.enable
                                        ? border?.width
                                        : "",
                                      borderColor: border?.enable
                                        ? border?.borderColor?.hex
                                        : "",
                                      borderStyle: border?.enable
                                        ? "solid"
                                        : "none",
                                      backgroundColor: `rgba(${item?.overlay?.rgb?.r},${item?.overlay?.rgb?.g},${item?.overlay?.rgb?.b},${item?.overlay?.rgb?.a})`,
                                    }}
                                  />
                                )}
                                {item?.title?.txt && (
                                  <div
                                    className={`absolute left-0 right-0 z-10 w-full mx-5 py-5 ${
                                      item.alignY === "top" && "top-0"
                                    } ${
                                      item.alignY === "center" &&
                                      "top-1/2 -translate-y-1/2"
                                    } ${
                                      item.alignY === "bottom" && "bottom-0"
                                    } ${!item.alignY && "top-0"}`}
                                    style={{
                                      textAlign: item?.align
                                        ? `${item?.align}`
                                        : "left",
                                      color: item?.title?.textColor?.hex,
                                    }}
                                  >
                                    <h3 className="text-xl font-semibold">
                                      <span
                                        style={{
                                          backgroundColor:
                                            data?.titleBgClr?.hex ?? "",
                                          padding: data?.titleBgClr?.hex
                                            ? "10px 30px"
                                            : "",
                                          borderRadius: data?.titleBgClr?.hex
                                            ? "8px"
                                            : "",
                                        }}
                                      >
                                        {item.title.txt}
                                      </span>
                                    </h3>
                                  </div>
                                )}
                              </DivContainer>
                            ) : (
                              <div className="player-wrapper">
                                {item?.videoType === "youtube" ? (
                                  <ReactPlayerYoutube
                                    className="react-player"
                                    url={item?.link}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <ReactPlayerVimeo
                                    className="react-player"
                                    url={item.link}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                  />
                                )}
                              </div>
                            )}
                          </div>

                          {blur && (
                            <div
                              className={`reveal-image ${
                                inView ? "mobileFadein" : "mobileFadeout"
                              } capitalize`}
                              onClick={onOpen}
                            >
                              {"Tap To Reveal"}
                            </div>
                          )}
                        </>
                      )}
                    </InView>
                  </div>
                );
              }
            })}
          </Masonry>
        </div>

        <div className="hidden md:block">
          <Masonry
            breakpointCols={
              data.layoutType === "full-width"
                ? breakpointColumnsObj2
                : breakpointColumnsObj
            }
            className={
              data.layoutType === "full-width"
                ? "my-masonry-full-grid"
                : "my-masonry-grid"
            }
            columnClassName={
              data.layoutType === "full-width" ? "" : "my-masonry-grid_column"
            }
          >
            {list.map((item, index) => {
              if (item.enable) {
                return (
                  <div key={index} className="cursor-pointer gallery-asset">
                    <div
                      style={{
                        filter: blur ? `blur(${data?.blur}px)` : "",
                      }}
                    >
                      {blur && (
                        <div
                          className="absolute top-0 left-0 right-0 bottom-0 z-50 w-full h-full"
                          onClick={onOpen}
                        />
                      )}
                      {item?.graphicType === "image" ? (
                        <DivContainer
                          imgLink={item?.imgLink}
                          linkType={item?.linkType}
                          sectionId={item?.sectionId}
                          title={item?.title?.txt}
                          cls={`overflow-hidden aspect-square cursor-pointer relative w-full h-full block ${
                            data.layoutType !== "full-width" && "rounded-[20px]"
                          }`}
                        >
                          <Image
                            asset={item?.image?.asset}
                            crop={item?.image?.crop}
                            hotspot={item.image.hotspot}
                            alt="gallery-img"
                            className={`${
                              data.layoutType !== "full-width" &&
                              "rounded-[20px]"
                            } aspect-square object-cover`}
                            style={{
                              borderWidth: border?.enable ? border?.width : "",
                              borderColor: border?.enable
                                ? border?.borderColor?.hex
                                : "",
                              borderStyle: border?.enable ? "solid" : "none",
                            }}
                          />
                          {item?.title?.txt && (
                            <div
                              className={`absolute inset-0 w-full h-full ${
                                data.layoutType !== "full-width" &&
                                "rounded-[20px]"
                              }`}
                              style={{
                                borderWidth: border?.enable
                                  ? border?.width
                                  : "",
                                borderColor: border?.enable
                                  ? border?.borderColor?.hex
                                  : "",
                                borderStyle: border?.enable ? "solid" : "none",
                                backgroundColor: `rgba(${item?.overlay?.rgb?.r},${item?.overlay?.rgb?.g},${item?.overlay?.rgb?.b},${item?.overlay?.rgb?.a})`,
                              }}
                            />
                          )}
                          {item?.title?.txt && (
                            <div
                              className={`absolute left-0 right-0 z-10 w-full p-5 ${
                                item.alignY === "top" && "top-0"
                              } ${
                                item.alignY === "center" &&
                                "top-1/2 -translate-y-1/2"
                              } ${item.alignY === "bottom" && "bottom-0"} ${
                                !item.alignY && "top-0"
                              }`}
                              style={{
                                textAlign: item?.align
                                  ? `${item?.align}`
                                  : "left",
                                color: item?.title?.textColor?.hex,
                              }}
                            >
                              <h3 className="text-xl font-semibold">
                                <span
                                  style={{
                                    backgroundColor:
                                      data?.titleBgClr?.hex ?? "",
                                    padding: data?.titleBgClr?.hex
                                      ? "10px 30px"
                                      : "",
                                    borderRadius: data?.titleBgClr?.hex
                                      ? "8px"
                                      : "",
                                  }}
                                >
                                  {item.title.txt}
                                </span>
                              </h3>
                            </div>
                          )}
                        </DivContainer>
                      ) : (
                        <div className="player-wrapper">
                          {item?.videoType === "youtube" ? (
                            <ReactPlayerYoutube
                              className="react-player"
                              url={item?.link}
                              controls={true}
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <ReactPlayerVimeo
                              className="react-player"
                              url={item.link}
                              width="100%"
                              height="100%"
                              controls={true}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {blur && (
                      <div
                        className={`reveal-image  capitalize`}
                        onClick={onOpen}
                      >
                        {"Tap To Reveal"}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </Masonry>
        </div>
      </div>
      {/* Email popup */}
      {popup && data.formfields !== "none" && (
        <div className="popup" id="email-popup-2">
          <div className="email-inner">
            <div>
              {data.formfields === "email" && (
                <h1 className="pb-2">Enter Your Email Address To Continue</h1>
              )}
              {data.formfields === "phone" && (
                <h1 className="pb-2">Enter Your Phone Number To Continue</h1>
              )}
              {data.formfields === "both" && (
                <h1 className="pb-2">
                  Enter Your Email and Phone Number To Continue
                </h1>
              )}
            </div>
            <form onSubmit={onSubmit}>
              {(data.formfields === "email" || data.formfields === "both") && (
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              {(data.formfields === "phone" || data.formfields === "both") && (
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  className="mt-3"
                  placeholder="Enter your phone number (111) 111-1111"
                  onChange={handlePhoneInput}
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
    </>
  );
}
