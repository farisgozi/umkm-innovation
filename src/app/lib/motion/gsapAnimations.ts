import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeIn = (target: string | HTMLElement, delay = 0) => {
  gsap.fromTo(
    target,
    { opacity: 0,},
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: target,
        start: "top 80%",
      },
    }
  );
};

// export const slideInFromLeft = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, x: -100 },
//     {
//       opacity: 1,
//       x: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const slideInFromRight = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, x: 100 },
//     {
//       opacity: 1,
//       x: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const scaleUp = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, scale: 0.8 },
//     {
//       opacity: 1,
//       scale: 1,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }; 

// export const staggerFadeIn = (targets: string, delay = 0, stagger = 0.2) => {
//   gsap.fromTo(
//     targets,
//     { opacity: 0, y: 20 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       stagger,
//       scrollTrigger: {
//         trigger: targets,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const rotateIn = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, rotation: -90 },
//     {
//       opacity: 1,
//       rotation: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const fadeInUp = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, y: 30 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

// export const fadeInDown = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, y: -30 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

// export const zoomIn = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, scale: 0.5 },
//     {
//       opacity: 1,
//       scale: 1,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

// export const zoomOut = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 1, scale: 1 },
//     {
//       opacity: 0,
//       scale: 0.5,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const rotateYIn = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, rotationY: -90 },
//     {
//       opacity: 1,
//       rotationY: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }; 

// export const rotateXIn = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, rotationX: -90 },
//     {
//       opacity: 1,
//       rotationX: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// };

// export const flipInX = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, rotationX: 90 },
//     {
//       opacity: 1,
//       rotationX: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

// export const flipInY = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, rotationY: 90 },
//     {
//       opacity: 1,
//       rotationY: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

// export const rollIn = (target: string, delay = 0) => {
//   gsap.fromTo(
//     target,
//     { opacity: 0, x: -100, rotation: -360 },
//     {
//       opacity: 1,
//       x: 0,
//       rotation: 0,
//       duration: 1,
//       ease: "power3.out",
//       delay,
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//       },
//     }
//   );
// }

