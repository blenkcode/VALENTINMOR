import React from "react";

const Frame = ({ children }) => {
  return (
    <div
      style={{
        clipPath: "inset(3% 3% 3% 3%)", // État initial du clip-path
      }}
      className="fixed w-screen top-0 left-0 h-[100svh]"
    >
      {children}
    </div>
  );
};

export default Frame;
