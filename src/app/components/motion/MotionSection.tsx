"use client";
import { useEffect, useRef } from "react";
import { fadeIn } from "@/app/lib/motion/gsapAnimations";

export default function MotionSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) fadeIn(ref.current, delay);
  }, [delay]);

  return (
    <section ref={ref} className={`relative will-change-transform ${className}`}>
      {children}
    </section>
  );
}
