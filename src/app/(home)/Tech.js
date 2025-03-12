import React from "react";

const Tech = () => {
  return (
    <div className="w-full flex px-[2vw] pb-[8.2vw] relative mt-[4vw]">
      <div className="h-[29vw] w-[1px] absolute left-1/2  bg-black"></div>

      <div className="h-[1px] w-[95vw]  absolute left-[2vw] top-[13.2vw] bg-black"></div>
      <div className="w-[3vw] absolute left-1/2 aspect-square top-[11.6vw] -translate-x-[46%] bg-white z-50 flex items-center justify-center">
        {/* <div className="w-[1vw] aspect-square bg-black"></div> */}
      </div>
      <div className=" w-1/4 relative ">
        {" "}
        <h4 className="text-[4vw] Med text-nowrap">
          <div>Designs whisper, </div>
          <div className="flex items-center  w-fit gap-[2vw]">
            <div className="w-[5vw] h-[0.3vw] bg-black"></div>
            <div>motions speaks</div>
          </div>
        </h4>{" "}
      </div>
      <div className=" w-2/8 flex flex-col gap-[0.2vw] "> </div>
      <div className="1/6"></div>

      <div className=" w-2/6 flex flex-col  text-[1vw] Med pl-[2vw] ">
        <p className="mt-[15.4vw]">
          I BELIEVE IN DESIGNS THAT GENTLY GUIDE USERS THROUGH THE PROCESS OF
          DISCOVERING YOUR BRAND'S UNIQUE STORY. EVERY PIXEL HAS PURPOSE, EVERY
          ANIMATION ADDS MEANING.
        </p>

        <p className="mt-[2vw]">
          MY APPROACH BLENDS CUTTING-EDGE FRONTEND EXPERTISE WHERE EACH
          ANIMATIONS & EASING ARE FINELY TUNED TO THE MILISECOND TO PROVIDE THE
          SMOOTHEST FEELING POSSIBLE.
        </p>
      </div>
    </div>
  );
};

export default Tech;
