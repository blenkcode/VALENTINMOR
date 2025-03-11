import React from "react";

const Tech = () => {
  return (
    <div className="w-full flex px-[2vw] pb-[20vw] relative">
      <div className="h-[64.5svh] w-[1px] absolute left-1/2 -top-58vw] bg-black"></div>
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

      <div className=" w-2/6 flex flex-col  text-[1.2vw] Med pl-[2vw] ">
        <p className="mt-[15.4vw]">
          I believe in designs that gently guide users through the process of
          discovering your brand's unique story. Every pixel has purpose, every
          animation adds meaning.
        </p>

        <p className="mt-[2vw]">
          My approach blends cutting-edge frontend expertise with a deep
          understanding of user psychology, crafting interfaces that feel
          intuitive yet surprising, familiar yet{" "}
          <span className="underline">innovative</span>.
        </p>
        <p className="mt-[2vw]">
          How you move is just as important as how you look.
        </p>
      </div>
    </div>
  );
};

export default Tech;
