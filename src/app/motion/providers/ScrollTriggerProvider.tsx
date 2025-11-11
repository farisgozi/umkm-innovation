"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

export default function ScrollTriggerProvider({ children }: ScrollTriggerProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sinkronisasi Lenis dengan GSAP ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value); // scrollTo Lenis
        } else {
          return lenis.scroll; // current scroll
        }
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      // optional: pinType "transform" untuk mobile touch
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const update = () => ScrollTrigger.update();

    // Update GSAP saat Lenis scroll
    lenis.on("scroll", update);

    // Update saat refresh ScrollTrigger
    ScrollTrigger.addEventListener("refresh", update);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", update);
      lenis.off("scroll", update);
    };
  }, [lenis]);

  return <>{children}</>;
}
