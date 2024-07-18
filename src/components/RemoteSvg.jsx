import React, { useEffect, useState } from "react";

export default function RemoteSvg({ url, className }) {
  const [svgStr, setSVGStr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((svg) => {
        setSVGStr(svg);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="spinner" />;
  } else if (!svgStr) {
    return <div className="error" />;
  }

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: svgStr }} />
  );
}
