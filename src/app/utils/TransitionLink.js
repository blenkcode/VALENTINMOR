"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createExitTimeline } from "../animations/CreateExitTimeLine";

const TransitionLink = ({ children, href, frame, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = async (e) => {
    e.preventDefault();

    if (pathname !== href) {
      console.log("patname:", pathname, "href:", href);

      await createExitTimeline(router, href, frame);
    }
  };

  return (
    <Link
      className="pointer-events-auto"
      href={href}
      {...props}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
export default TransitionLink;
