"use client";
import { useEffect, useRef } from "react";
import { kineticText } from "./KinecticText";

export default function MotionText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) kineticText(ref.current, delay);
  }, [delay]);

  return (
    <h2 ref={ref} className={`overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline opacity-0">
          {char}
        </span>
      ))}
    </h2>
  );
}
