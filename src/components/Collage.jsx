import Image from "gatsby-plugin-sanity-image";
import React from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-scroll";

export function DivContainer({ imgLink, children, cls, linkType, sectionId }) {
  if (linkType === "sectionId") {
    return (
      <Link className={`${cls}`} to={sectionId} smooth={true} duration={500}>
        {children}
      </Link>
    );
  }
  if (linkType !== "sectionId" && imgLink) {
    return (
      <a className={`${cls}`} href={imgLink} target="_blank">
        {children}
      </a>
    );
  } else {
    return <div className={cls}>{children}</div>;
  }
}

export default function Collage({ data }) {
  const border = data?.border;

  console.log(data);

  return (
    <>
      <div
        id={data?.sectionId}
        // className={
        //   data.layoutType === "full-width"
        //     ? ""
        //     : "lb-container layout px-3 md:px-5"
        // }
      >
        <div className="block ">
          <div className="cursor-pointer gallery-asset">
            <InView>
              {({ inView, ref }) => (
                <>
                  <div ref={ref}>
                    <DivContainer
                      imgLink={data?.imgLink}
                      linkType={data?.linkType}
                      sectionId={data?.sectionId}
                      cls={`overflow-hidden aspect-square md:aspect-[3/1] cursor-pointer relative w-full h-full block`}
                    >
                      <Image
                        asset={data?.image?.asset}
                        crop={data?.image?.crop}
                        hotspot={data.image.hotspot}
                        alt="gallery-img"
                        className={`w-full aspect-square md:aspect-[3/1] z-0 overflow-hidden object-cover`}
                        style={{
                          borderWidth: border?.enable ? border?.width : "",
                          borderColor: border?.enable
                            ? border?.borderColor?.hex
                            : "",
                          borderStyle: border?.enable ? "solid" : "none",
                        }}
                      />
                      {data?.title?.txt && (
                        <div
                          className={`absolute inset-0 w-full h-full ${
                            data.layoutType !== "full-width" && "rounded-[20px]"
                          }`}
                          style={{
                            borderWidth: border?.enable ? border?.width : "",
                            borderColor: border?.enable
                              ? border?.borderColor?.hex
                              : "",
                            borderStyle: border?.enable ? "solid" : "none",
                            backgroundColor: `rgba(${data?.overlay?.rgb?.r},${data?.overlay?.rgb?.g},${data?.overlay?.rgb?.b},${data?.overlay?.rgb?.a})`,
                          }}
                        />
                      )}
                      {data?.title?.txt && (
                        <div
                          className={`absolute left-0 right-0 z-10 w-full p-5 ${
                            data.alignY === "top" && "top-0"
                          } ${
                            data.alignY === "center" &&
                            "top-1/2 -translate-y-1/2"
                          } ${data.alignY === "bottom" && "bottom-0"} ${
                            !data.alignY && "top-0"
                          }`}
                          style={{
                            textAlign: data?.align ? `${data?.align}` : "left",
                            color: data?.title?.textColor?.hex,
                          }}
                        >
                          <h3 className="text-xl font-semibold">
                            <span
                              style={{
                                backgroundColor: data?.titleBgClr?.hex ?? "",
                                padding: data?.titleBgClr?.hex
                                  ? "10px 30px"
                                  : "",
                                borderRadius: data?.titleBgClr?.hex
                                  ? "8px"
                                  : "",
                              }}
                            >
                              {data.title.txt}
                            </span>
                          </h3>
                        </div>
                      )}
                    </DivContainer>
                  </div>
                </>
              )}
            </InView>
          </div>
        </div>
      </div>
      {/* Email popup */}
    </>
  );
}
