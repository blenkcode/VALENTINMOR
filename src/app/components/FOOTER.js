import React from "react";
import TransitionLink from "../utils/TransitionLink";
import Button from "./Button";
const FOOTER = () => {
  return (
    <div className="w-full h-[60svh] bg-neutral-950 relative  px-[2vw] flex flex-col justify-between text-white border-t-[1px]">
      <div className="flex  mt-[2.5vw] text-[1vw]">
        <div className="w-1/4 flex flex-col gap-[1vw]">
          <h5 className="Med text-[3vw]">作品</h5>

          <ul className="text-[0.8vw] Med">
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/blenk">
                {" "}
                <Button text="FERTILE" />
              </TransitionLink>
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/confusion">
                {" "}
                <Button text="CAMILLE JUTEL" />
              </TransitionLink>
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/eyrah">
                {" "}
                <Button text="MARINE BENABOU" />
              </TransitionLink>
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/geistfrei">
                <Button text="AMOURATROI" />
              </TransitionLink>
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/ketrobinson">
                {" "}
                <Button text=" LE CHANT DES OISEAUX" />
              </TransitionLink>
            </li>
          </ul>
        </div>
        <div className="w-2/8 flex flex-col gap-[1vw]">
          {" "}
          <h5 className="Med text-[3vw]">接触</h5>
          <ul className="text-[0.8vw] Med">
            <li className="group overflow-hidden h-fit w-fit relative">
              <Button text="LINKEDIN" />
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <Button text="INSTAGRAM" />
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <Button text="VALENTINMOR.PRO@GMAIL.COM" />
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <Button text="+33 6 31 81 72 32" />
            </li>
          </ul>
        </div>
        <div className="w-1/6"></div>
        <div className="w-1/6 flex flex-col gap-[1vw]">
          <h5 className="Med text-[3vw]">回航</h5>

          <ul className="text-[0.8vw] Med">
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/blenk">
                {" "}
                <Button text="INDEX" />
              </TransitionLink>
            </li>
            <li className="group overflow-hidden h-fit w-fit relative">
              <TransitionLink href="/Roster/confusion">
                {" "}
                <Button text="ABOUT" />
              </TransitionLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="  pb-[1.5vw] text-[1vw] flex items-center">
        <p className="text-[4vw] w-1/4  text-nowrap ">VALENTIN MOR</p>
        <div className="text-[4vw] w-2/8  "></div>
        <div className="text-[4vw] w-1/6  "></div>
        <div className="">
          <p>Berlin time : </p>
          <div>12 : 15 : 14 AM</div>
        </div>
      </div>
    </div>
  );
};

export default FOOTER;
