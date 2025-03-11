"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createExitTimeline } from "../animations/CreateExitTimeLine";
import { useBurger } from "../Context/ModalContext";
const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setArtist } = useBurger();
  const handleTransition = async (e) => {
    e.preventDefault();

    if (pathname !== href) {
      setArtist(null);
      console.log("patname:", pathname, "href:", href);

      await createExitTimeline(router, href);
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
