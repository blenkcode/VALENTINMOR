import React from "react";

const FixedText = ({ title1, title2, title3, isBottom }) => {
  return (
    <div className="relative bg-red-500">
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "470svh" : "0",
        }}
        ref={title1}
        className="flex gap-[2.5vw] justify-start pt-[10vw]  items-start   left-[65.05%]  translate-y-[100%] h-[100svh] fixed z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[2vw] aspect-square bg-white mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Design</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.9vw]">
            I create interfaces that captivate while guiding users intuitevely
            through your brand's journey
          </p>
        </div>
      </div>
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "470svh" : "0",
        }}
        ref={title2}
        className="flex gap-[2.5vw] justify-start pt-[23vw]  items-start   left-[65.05%]  translate-y-[100%] h-[100svh] fixed z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[2vw] aspect-square bg-white  mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Motions</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.9vw]">
            Each animations & easing are finely tuned to the milisecond to
            provide the smoothest feeling possible.
          </p>
        </div>
      </div>
      <div
        style={{
          willChange: "transform, position",
          position: isBottom ? "absolute" : "fixed",
          top: isBottom ? "470svh" : "0",
        }}
        ref={title3}
        className="flex gap-[2.5vw] justify-start pt-[37vw]  items-start   left-[65.05%] translate-y-[100%] h-[100svh]  z-30 top-0"
      >
        <div className="border-black rounded-full border-[1px] w-[vw]  h-[2vw] aspect-square bg-white mt-[1vw] "></div>
        <div>
          <h6 className="  h-[4vw] text-[3vw] Med">Development</h6>{" "}
          <p className="mt-[1vw] w-3/4 Med text-[0.9vw]">
            Performant frontends using cutting-edge technologies that bring
            designs to life flawlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FixedText;
