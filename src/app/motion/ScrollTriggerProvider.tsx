"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

export default function ScrollTriggerProvider({ children }: ScrollTriggerProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const update = () => ScrollTrigger.update();

    lenis.on("scroll", update);
    ScrollTrigger.addEventListener("refresh", update);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
      ScrollTrigger.removeEventListener("refresh", update);
    };
  }, [lenis]);

  return <>{children}</>;
}
