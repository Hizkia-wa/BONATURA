
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_KEY = "bonatura-intro-seen";

function Leaf({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 42 22"
      className={className}
      initial={{ opacity: 0, scale: 0.2, rotate: -28 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      fill="none"
    >
      <path d="M3 18C10 2 25 1 38 4C34 17 19 24 3 18Z" fill="#87916B" />
      <path d="M4 18C15 14 25 9 36 5" stroke="#F1EAE0" strokeWidth="1.1" />
      <path
        d="M16 13L13 7M24 10L23 5M19 12L22 18"
        stroke="#F1EAE0"
        strokeWidth=".8"
        opacity=".8"
      />
    </motion.svg>
  );
}

export default function EntranceAnimation() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") return;

      setShowIntro(true);

      const timer = window.setTimeout(() => {
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}

        setReady(true);
      }, reduceMotion ? 700 : 3900);

      return () => window.clearTimeout(timer);
    } catch {
      setShowIntro(true);

      const timer = window.setTimeout(() => {
        setReady(true);
      }, reduceMotion ? 700 : 3900);

      return () => window.clearTimeout(timer);
    }
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#F1EAE0] text-[#3E2723]"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.25 : 0.9,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            if (ready) setShowIntro(false);
          }}
          aria-label="BONATURA introduction"
          role="status"
        >
          {/* Parchment texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#9C8060_0.7px,transparent_0.7px)] [background-size:17px_17px]" />

          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D6C4A8]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#B85C38]/10 blur-3xl" />

          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-5 sm:px-8 text-center">
            <motion.p
              className="mb-6 sm:mb-8 text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.34em] text-[#8B7559]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              A world waiting to be discovered
            </motion.p>

            {/* Botanical compass */}
            <motion.div
              className="relative mb-6 sm:mb-7 h-64 w-64 sm:h-72 sm:w-72 lg:h-[22rem] lg:w-[22rem]"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.svg
                viewBox="0 0 300 300"
                className="h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <motion.circle
                  cx="150"
                  cy="150"
                  r="111"
                  stroke="#B69B70"
                  strokeWidth="1.1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.3, delay: 0.35 }}
                />

                <motion.circle
                  cx="150"
                  cy="150"
                  r="94"
                  stroke="#B69B70"
                  strokeWidth=".8"
                  strokeDasharray="2 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />

                {Array.from({ length: 32 }, (_, i) => (
                  <line
                    key={i}
                    x1="150"
                    y1="28"
                    x2="150"
                    y2={i % 4 === 0 ? 43 : 35}
                    stroke="#A58A61"
                    strokeWidth={i % 4 === 0 ? 1.4 : 0.7}
                    transform={`rotate(${i * 11.25} 150 150)`}
                  />
                ))}

                <motion.path
                  d="M150 47L163 139L150 128L137 139Z"
                  fill="#B85C38"
                  initial={{ rotate: -65, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{
                    delay: 1.6,
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "150px 150px" }}
                />

                <motion.path
                  d="M150 253L137 161L150 172L163 161Z"
                  fill="#C5AE85"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.8 }}
                />

                <circle cx="150" cy="150" r="7" fill="#76583C" />
                <circle cx="150" cy="150" r="3" fill="#F1EAE0" />

                <text x="150" y="19" textAnchor="middle" fill="#76583C" fontSize="11" letterSpacing="3">N</text>
                <text x="150" y="289" textAnchor="middle" fill="#76583C" fontSize="11" letterSpacing="3">S</text>
                <text x="17" y="154" textAnchor="middle" fill="#76583C" fontSize="11" letterSpacing="2">W</text>
                <text x="283" y="154" textAnchor="middle" fill="#76583C" fontSize="11" letterSpacing="2">E</text>
              </motion.svg>

              {/* Leaves around the compass */}
              <Leaf className="absolute left-[2%] top-[15%] w-12 lg:w-14 -rotate-[28deg]" delay={1.05} />
              <Leaf className="absolute right-[1%] top-[15%] w-12 lg:w-14 rotate-[205deg]" delay={1.2} />
              <Leaf className="absolute bottom-[14%] left-[2%] w-12 lg:w-14 rotate-[28deg]" delay={1.35} />
              <Leaf className="absolute bottom-[14%] right-[1%] w-12 lg:w-14 rotate-[155deg]" delay={1.5} />
              <Leaf className="absolute left-[43%] top-[-1%] w-10 lg:w-12 -rotate-12" delay={1.65} />
              <Leaf className="absolute bottom-[-1%] left-[43%] w-10 lg:w-12 rotate-[168deg]" delay={1.8} />
            </motion.div>

            {/* Brand reveal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.35, duration: 0.9 }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.18em] text-[#4B3829]">
                BONATURA
              </h1>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base tracking-wide text-[#806B52]">
                Every culture has a story. Find yours.
              </p>
            </motion.div>

            <motion.div
              className="mt-7 sm:mt-9 h-px w-24 lg:w-32 bg-[#B69B70]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.7, duration: 0.8 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
