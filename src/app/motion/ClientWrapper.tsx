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
      ease: "power1.out",
      duration: 0.6,
      overwrite: "auto",
    });
  }, []);

  const handleScroll = () => {
    ScrollTrigger.update();
  };

  return (
    <ReactLenis
      options={{
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
      root
      onScroll={handleScroll}
    >
      <ScrollTriggerProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey ?? "default"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} // easeInOutCubic
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </ScrollTriggerProvider>
    </ReactLenis>
  );
}
