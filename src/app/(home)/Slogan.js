import React from "react";
import Gallery from "./Gallery";
const Slogan = () => {
  return (
    <div className="w-full h-[500svh] relative">
      <div className="w-full px-[2vw] pt-[2vw] pb-[20vw] flex items-start justify-center bg-neutral-950 text-white">
        {" "}
        <div className="w-full flex">
          {" "}
          <div className="w-1/4 Med text-[1.2vw] mt-[1.5vw]">
            <p>Snapshots of my recents works for the seek of visual appeal.</p>
          </div>
          <div className="w-2/8 text-[4vw] flex justify-center translate-x-[2vw]">
            {" "}
            →
          </div>
          <div className="w-1/6 flex">
            <h5 className="text-[4vw]">Gallery </h5>
          </div>
          <div className="Med text-[4vw] w-1/6"></div>
          <div className="Med text-[4vw] pr-[2vw]"></div>
        </div>
      </div>

      <Gallery />
    </div>
  );
};

export default Slogan;
