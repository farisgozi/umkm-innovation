"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFooterSequence(triggerSelector: string, footerSelector: string) {
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const triggerEl = document.querySelector(triggerSelector);
    const footerEl = document.querySelector(footerSelector);
    if (!triggerEl || !footerEl) return;

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "bottom bottom",
        end: "+=100%",
        scrub: true,
      },
    });

    tl.current
      .to(triggerEl, { opacity: 0, y: -50, duration: 1.2, ease: "power2.inOut" })
      .fromTo(
        footerEl,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "<0.2"
      );

    return () => {
      tl.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [triggerSelector, footerSelector]);
}
