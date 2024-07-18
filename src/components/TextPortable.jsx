import { PortableText } from "@portabletext/react";
import React from "react";

export default function TextPortable({ data }) {
  return (
    <div
      id={data?.sectionId}
      className="prose max-w-none py-5 lb-container layout px-3 md:px-5"
      style={{
        textAlign: data?.align ? `${data.align}` : "center",
      }}
    >
      {data?._rawEditor && (
        <PortableText
          value={data?._rawEditor}
          components={{
            marks: {
              color: ({ value, children }) => (
                <span style={{ color: value.hex }}>{children}</span>
              ),
            },
          }}
        />
      )}
    </div>
  );
}
