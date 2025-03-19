import React from "react";

const Frame = ({ children }) => {
  return (
    <div
      style={{
        clipPath: "inset(3% 3% 3% 3%)", // État initial du clip-path
      }}
      className="absolute w-screen bg-red-500 top-0 left-0 h-full"
    >
      {children}
    </div>
  );
};

export default Frame;
