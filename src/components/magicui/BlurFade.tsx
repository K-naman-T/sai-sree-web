/**
 * BlurFade — sourced from Magic UI (https://magicui.design) by Dillion Verma,
 * distributed on 21st.dev (https://21st.dev/@dillionverma/components/blur-fade).
 * Adapted: imports framer-motion (bundled here) instead of motion/react.
 */
import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, type MotionProps, type Variants } from "framer-motion";

interface BlurFadeProps extends MotionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 12,
  direction = "up",
  inView = true,
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, { once: true, margin: "-60px" });
  const shown = !inView || inViewResult;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const signed = direction === "right" || direction === "down" ? -offset : offset;
  const shift = axis === "x" ? { x: signed } : { y: signed };

  const variants: Variants = {
    hidden: { opacity: 0, filter: `blur(${blur})`, ...shift },
    visible: { opacity: 1, filter: "blur(0px)", ...(axis === "x" ? { x: 0 } : { y: 0 }) },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={shown ? "visible" : "hidden"}
        exit="hidden"
        variants={variants}
        transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
