import React from "react";

const Frame = ({}) => {
  return (
    <div className="fixed w-screen top-0 left-0 h-[100svh] z-[10000] pointer-events-none">
      <div className="h-full absolute w-[4vw] bg-black left-0 top-0 frameleft -translate-x-[4vw]"></div>
      <div className="h-full absolute  w-[4vw] bg-black right-0 top-0 frameright translate-x-[4vw]"></div>
      <div className="h-[4vw] absolute w-screen bg-black left-0 top-0 frametop -translate-y-[4vw]"></div>
      <div className="h-[4vw] absolute w-screen bg-black left-0 bottom-0 framebottom translate-y-[4vw]"></div>
    </div>
  );
};

export default Frame;
