"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import ScrollTriggerProvider from "./ScrollTriggerProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ClientWrapperProps {
  children: ReactNode;
  pageKey?: string | number;
}

export default function ClientWrapper({ children, pageKey }: ClientWrapperProps) {
  useEffect(() => {
    gsap.defaults({
      ease: "power2.inOut", // konsisten dengan Warm Sunset easing
      duration: 0.6,
      overwrite: "auto",
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.08, // floating feel
        syncTouch: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
      onScroll={() => ScrollTrigger.update()}
    >
      <ScrollTriggerProvider>
        <AnimatePresence mode="wait">
          <motion.main
            key={pageKey ?? "default"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="will-change-transform"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </ScrollTriggerProvider>
    </ReactLenis>
  );
}
