/**
 * ParallaxDrift - mechanics after Aceternity UI's "Parallax Scroll"
 * (https://ui.aceternity.com/components/parallax-scroll), adapted: a single
 * element drifts around a still anchor as the page scrolls past it, with small
 * editorial ranges. motion/react is replaced by the bundled framer-motion, and
 * the drift is disabled under prefers-reduced-motion.
 */
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function ParallaxDrift({
  children,
  className,
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  /** Peak drift in px: from +distance to -distance across the scroll pass. */
  distance?: number;
}) {
  const anchor = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: anchor,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={anchor} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
