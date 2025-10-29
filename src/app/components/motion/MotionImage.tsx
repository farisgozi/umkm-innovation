"use client";
import { useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { fadeIn } from "@/app/lib/motion/gsapAnimations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MotionImageProps extends ImageProps {
  delay?: number;
  parallax?: boolean;
}

export default function MotionImage({
  delay = 0,
  parallax = true,
  ...props
}: MotionImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) fadeIn(ref.current, delay);

    if (parallax && ref.current) {
      gsap.to(ref.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          scrub: true,
        },
      });
    }
  }, [delay, parallax]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden will-change-transform"
    >
      <Image
        {...props}
        alt={props.alt}
        fill={props.fill ?? true}
        className={`object-cover ${props.className || ""}`}
        priority={props.priority}
      />
    </div>
  );
}
