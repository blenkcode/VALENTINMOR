import React from "react";

const FolioTitle = ({ jap, number, date, arrow }) => {
  return (
    <div
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      className="w-full flex items-center all md:justify-start  md:pl-[2vw] justify-center folio md:titlework pt-[0svh] md:pt-0"
    >
      {" "}
      <div className="overflow-hidden">
        {" "}
        <h3 className="Med md:text-[2.5vw] text-[9vw] works2 [backface-visibility:hidden] [transform-origin:center] will-change-transform flex">
          <div
            style={{
              transform: "rotateX(120deg) ",
            }}
            className="works translate-y-full"
          >
            W
          </div>{" "}
          <div
            style={{
              transform: "rotateX(120deg) ",
            }}
            className="works translate-y-full"
          >
            o
          </div>{" "}
          <div
            style={{
              transform: "rotateX(120deg) ",
            }}
            className="works translate-y-full"
          >
            r
          </div>{" "}
          <div
            style={{
              transform: "rotateX(120deg) ",
            }}
            className="works translate-y-full"
          >
            k
          </div>{" "}
          <div
            style={{
              transform: "rotateX(120deg) ",
            }}
            className="works translate-y-full"
          >
            s
          </div>
        </h3>
      </div>
      <div className="overflow-hidden h-fit md:-translate-y-[1vw] -translate-y-[5vw]">
        {" "}
        <div
          style={{
            transform: "rotateX(120deg)",
          }}
          ref={number}
          className="md:text-[0.8vw] text-[3vw] translate-y-full [backface-visibility:hidden] [transform-origin:center] will-change-transform"
        >
          (05)
        </div>
      </div>
    </div>
  );
};

export default FolioTitle;
