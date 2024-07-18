import { useEffect } from "react";

const Chatbot = () => {
  //   const { botColor, botName, des, avatar } = data;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.async = true;
    document.body.appendChild(script);
    // script.onload = () => {
    //   window.voiceflow.chat.load({
    //     verify: { projectID: "6570b1aca982ea0007e1e4fa" },
    //     url: "https://general-runtime.voiceflow.com",
    //     versionID: "production",
    //     assistant: {
    //       title: botName,
    //       description: des,
    //       image: avatar?.asset?.url,
    //       avatar: avatar?.asset?.url,
    //       color: botColor?.hex,
    //     },
    //   });
    // };
  }, []);

  return null;
};

export default Chatbot;
