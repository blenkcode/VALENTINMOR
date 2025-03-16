import React from "react";
import Folio from "./Folio";
import Landing from "./Landing";
import CarousselSection from "./CarousselSection";
const page = () => {
  return (
    <main className=" w-full relative flex flex-col   items-center  ">
      <Landing />

      <Folio />
      <CarousselSection />
      <div className="w-full h-[70svh] "></div>
    </main>
  );
};

export default page;
