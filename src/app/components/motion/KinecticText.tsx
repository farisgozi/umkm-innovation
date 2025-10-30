import { gsap } from "gsap";

export const kineticText = (target: HTMLElement, delay = 0) => {
  const chars = target.querySelectorAll("span");
  gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.04,
    delay,
  });
};
