"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import SparklesText from "./ui/sparkles-text";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroHighlightDemo() {
  const navigate = useNavigate();  // Declare the navigate function here

  return (
    <div>
      <HeroHighlight>
        <div className="-mt-[100px] w-full absolute text-white sm:text-center">
          <SparklesText text="Second Brain" />
        </div>
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
          className="text-2xl -mt-[10px] md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          <Highlight className="text-black dark:text-white">
            keep what’s truly yours.
          </Highlight>
        </motion.h1>
        <div>
          <div className="text-white mt-[20px] font-roboto font-md text-lg w-[400px] md:w-[520px] text-center">
            Unlock Your Potential: Organize, Capture, and Optimize Your Thoughts with Second Brain.
          </div>
          <span className="z-10 flex translate-y-10 items-center justify-center">
            <button  onClick={() => navigate("/signup")} >
            <AnimatedGradientText>
              🎉 <hr className="mx-3 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
               
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Register Here
              </span>
              <ChevronRight className="ml-1 size-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
            </button>
          </span>
        </div>
      </HeroHighlight>
    </div>
  );
}
