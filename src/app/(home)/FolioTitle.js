import React from "react";

const FolioTitle = ({ jap, number, date, arrow }) => {
  return (
    <div
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      className="w-full flex items-center all md:justify-start  md:pl-0 justify-start folio pl-[2vw] titlework pt-[0svh] md:pt-0"
    >
      {" "}
      <div className="md:w-[6vw] md:text-[2vw] text-[6vw]  Med pt-[vw] overflow-hidden md:pl-[2vw] md:pr-0 pr-[2vw]">
        {" "}
        <div
          style={{
            transform: "rotateX(120deg)",
          }}
          ref={arrow}
          className="translate-y-full [backface-visibility:hidden] [transform-origin:center] will-change-transform"
        >
          →
        </div>
      </div>
      <div className="md:w-1/6 flex md:-translate-x-[1.2vw]">
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
        <div className="overflow-hidden h-fit">
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
      <div className="md:w-1/6 w-0 "></div>
      <div className="Med md:text-[2vw] md:w-1/6 w-0 flex justify-end md:pr-[2vw] overflow-hidden pt-[1.8vw] ">
        <div
          style={{
            transform: "rotateX(120deg)",
          }}
          ref={date}
          className="translate-y-full [backface-visibility:hidden] [transform-origin:center] will-change-transform folior"
        >
          {" "}
          2024/25
        </div>
      </div>
    </div>
  );
};

export default FolioTitle;
