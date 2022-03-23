import { Variants } from "framer-motion";

export const cardContainerVariants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 100,
      duration: 0.5,
    },
  },
};

export const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
  },
};

export const fadeInLeft: Variants = {
  offscreen: { opacity: 0, x: -100 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, type: "spring", stiffness: 100 },
  },
};
export const thumbNailContainer: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 100,
      duration: 0.5,
    },
  },
};

export const thumbNail: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
