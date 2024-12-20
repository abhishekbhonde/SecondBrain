"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl -mt-[150px]  md:text-4xl lg:text-5xl font-bold  text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
       With every thought scattered, memories blur. Store, recall, and set
       {" "}
        <Highlight className="text-black dark:text-white">
        keep what’s truly yours.
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}

