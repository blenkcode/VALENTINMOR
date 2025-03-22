import React from "react";

const FolioTitle = ({ jap, number, date, arrow }) => {
  return (
    <div
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      className="w-full flex items-center all folio titlework"
    >
      {" "}
      <div className="w-[6vw] text-[2vw]  Med pt-[vw] overflow-hidden pl-[2vw]">
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
      <div className="w-1/6 flex -translate-x-[1.2vw]">
        <div className="overflow-hidden">
          {" "}
          <h3 className="Med text-[2.5vw] works2 [backface-visibility:hidden] [transform-origin:center] will-change-transform flex">
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
            className="text-[0.8vw] translate-y-full [backface-visibility:hidden] [transform-origin:center] will-change-transform"
          >
            (05)
          </div>
        </div>
      </div>
      <div className="Med text-[4vw] w-1/6 overflow-hidden"></div>
      <div className="Med text-[2vw] w-1/6 flex justify-end pr-[2vw] overflow-hidden pt-[1.8vw] ">
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
