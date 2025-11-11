"use client";

import { Variants, Transition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const transitionEase: Transition = {
  duration: 0.9,
  ease: [0.25, 0.1, 0.25, 1],
};

export const slowEase: Transition = {
  duration: 1.4,
  ease: [0.45, 0, 0.55, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitionEase },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...transitionEase, delay: 0.15 },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: slowEase },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: slowEase },
};

export const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: (i = 1) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, ...transitionEase },
  }),
};

export const zoomParallax: Variants = {
  hidden: { scale: 1.2, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { ...transitionEase, duration: 1.2 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const bentoHover = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.03,
    rotate: -0.3,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const gsapParallax = (target: string, options = {}) => {
  if (typeof window === "undefined") return;

  const defaults = {
    yPercent: -20,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  };

  gsap.to(target, { ...defaults, ...options });
};
