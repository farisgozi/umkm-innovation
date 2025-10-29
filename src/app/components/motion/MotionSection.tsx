"use client";
import { useEffect, useRef } from "react";
import { fadeIn } from "@/app/lib/motion/gsapAnimations";

export default function MotionSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) fadeIn(ref.current);
  }, []);

  return (
    <section ref={ref} className={`relative ${className}`}>
      {children}
    </section>
  );
}
