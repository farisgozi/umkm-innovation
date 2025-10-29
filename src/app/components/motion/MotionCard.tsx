"use client";
import { motion } from "framer-motion";

export default function MotionCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`rounded-3xl shadow-md bg-white/10 backdrop-blur-md overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
}
