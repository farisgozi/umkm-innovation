"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook reusable untuk animasi reveal section saat masuk viewport.
 * Efek cinematic fade + slight parallax dari bawah.
 */
export function useSectionReveal(options: { triggerMargin?: number } = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top+=${options.triggerMargin ?? 50} bottom`,
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      el,
      { autoAlpha: 0, y: 60 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        clearProps: "all",
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [options.triggerMargin]);

  return sectionRef;
}
