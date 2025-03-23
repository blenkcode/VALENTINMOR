import React from "react";

const Title = ({ text }) => {
  const letters = Array.from(text || "");
  return (
    <div
      style={{
        transformOrigin: "center bottom",
        perspective: "1000px",
        perspectiveOrigin: "center bottom",
      }}
      className="w-full flex items-center all md:justify-start absolute top-[1vw] left-0  md:pl-[2vw] justify-center folio pt-[0svh] md:pt-0 md:visible invisible md:h-auto h-0 text-black"
    >
      {" "}
      <div className="overflow-hidden">
        {" "}
        <h3 className="Med md:text-[2.5vw] text-[9vw]  [backface-visibility:hidden] [transform-origin:center] will-change-transform flex">
          {letters.length > 0 ? (
            letters.map((letter, index) => (
              <div
                key={index}
                style={{
                  transform: "rotateX(120deg)",
                  display: "inline-block", // Assurez-vous que chaque lettre est bien affichée en ligne
                }}
                className="works translate-y-full"
              >
                {
                  letter === " "
                    ? "\u00A0"
                    : letter /* Remplacer les espaces par des espaces insécables */
                }
              </div>
            ))
          ) : (
            <div>No text provided</div>
          )}
        </h3>
      </div>
    </div>
  );
};

export default Title;
