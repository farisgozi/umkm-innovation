"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerContextValue {
  timeline: gsap.core.Timeline | null;
}

const ScrollTriggerContext = createContext<ScrollTriggerContextValue>({
  timeline: null,
});

export const useScrollTriggerTimeline = () => useContext(ScrollTriggerContext);

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

export default function ScrollTriggerProvider({ children }: ScrollTriggerProviderProps) {
  const lenis = useLenis();
  const timeline = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.6 } });

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

  return (
    <ScrollTriggerContext.Provider value={{ timeline }}>
      {children}
    </ScrollTriggerContext.Provider>
  );
}
