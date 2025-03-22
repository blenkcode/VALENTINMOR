"use client";
import HEADER from "./HEADER";
import HEADERMobile from "./HEADERMobile";
import { useMobile } from "../Context/isMobileContext";
const HEADERS = () => {
  const { isMobile } = useMobile();

  return isMobile ? <HEADERMobile /> : <HEADER />;
};

export default HEADERS;
