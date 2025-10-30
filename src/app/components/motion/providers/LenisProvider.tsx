"use client";

import { useEffect } from "react";
import initLenis from "../../../lib/motion/smoothScroll";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis();
  }, []);

  return <>{children}</>;
}
