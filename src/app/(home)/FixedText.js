import React from "react";

const FixedText = ({ title1, title2, title3, isBottom }) => {
  return (
    <div className="relative ">
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "570svh" : "0",
        }}
        ref={title1}
        className="flex gap-[2.5vw] justify-start pt-[10vw]  items-start   left-[65.05%]  translate-y-[100%] h-[100svh] fixed z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[1vw] aspect-square bg-white mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Design</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.8vw]">
            I CREATE INTERFACES THAT CAPTIVATE WHILE GUIDING USERS INTUITEVELY
            THROUGH YOUR BRAND'S UNIQUE JOURNEY
          </p>
        </div>
      </div>
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "570svh" : "0",
        }}
        ref={title2}
        className="flex gap-[2.5vw] justify-start pt-[23vw]  items-start   left-[65.05%]  translate-y-[100%] h-[100svh] fixed z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[1vw] aspect-square bg-white  mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Motions</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.8vw]">
            EACH ANIMATIONS & EASING ARE FINELY TUNED TO THE MILISECOND TO
            PROVIDE THE SMOOTHEST FEELING POSSIBLE
          </p>
        </div>
      </div>
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "570svh" : "0",
        }}
        ref={title3}
        className="flex gap-[2.5vw] justify-start pt-[37vw]  items-start   left-[65.05%] translate-y-[100%] h-[100svh]  z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[1vw] aspect-square bg-white mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Development</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.8vw]">
            PERFORMANT FRONT-END USING CUTTING-EDGE TECHNOLOGIES THAT BRING
            DESIGN TO LIFE FLAWLESLY
          </p>
        </div>
      </div>
    </div>
  );
};

export default FixedText;
