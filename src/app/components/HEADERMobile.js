"use client";
import React from "react";
import Button from "./Button";

const HEADERMobile = () => {
  return (
    <nav className="w-screen fixed flex flex-col  justify-between top-0 pt-[2vw] px-[2vw]    text-[4vw] Med z-[1000] left-0 h-[100svh] pb-[2vw] header will-change-transform [backface-visibility:hidden] [transform-origin:center] pointer-events-none">
      <div className="w-full flex h-1/2">
        {" "}
        <div className=" w-full flex flex-col items-end">
          <div className="pointer-events-auto">
            <Button href="/" text="Index" />
          </div>
          <div className="pointer-events-auto">
            <Button href="/About" text="About" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between h-1/2 items-end">
        <div className=" w-1/2 flex flex-col gap-[0.2vw]">
          <div className="pr-[2vw] ">Mor</div>
          <div className="pr-[2vw] ">Valentin</div>
        </div>
        <div className=" w-1/2 flex pb-[1vw] pr-[1vw] justify-end ">
          {" "}
          <div className=" group rounded-full h-fit pointer-events-auto w-fit py-[1vw] px-[2.5vw] flex items-center gap-[0.5vw]  border-black  border-[1px]  translate-x-[0.vw]">
            CONTACT
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HEADERMobile;
