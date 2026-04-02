"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const comparisons = [
  {
    approach: "Traditional Provenance",
    status: "limited",
    points: [
      "Trust-heavy infrastructure",
      "Invasive metadata exposure",
      "Centralized failure points",
    ],
  },
  {
    approach: "AI Detection",
    status: "limited",
    points: [
      "Probabilistic, not deterministic",
      "Arms race with generative models",
      "Unreliable at scale",
    ],
  },
  {
    approach: "Zero-Knowledge Provenance",
    status: "solution",
    points: [
      "Mathematically verifiable",
      "Privacy-preserving by design",
      "Decentralized validation",
    ],
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="annotation">The Problem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-medium tracking-tight max-w-2xl"
          >
            Deepfakes and manipulated media erode trust. Current solutions force a false choice between authenticity and privacy.
          </motion.h2>

          {/* Comparison Grid */}
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.approach}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`p-8 ${
                  item.status === "solution"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-background"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-medium ${item.status === "solution" ? "text-teal" : ""}`}>
                    {item.approach}
                  </h3>
                  {item.status === "solution" && (
                    <span className="text-xs font-mono text-teal">SOLUTION</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {item.points.map((point) => (
                    <li 
                      key={point} 
                      className={`text-sm flex items-start gap-3 ${
                        item.status === "solution" 
                          ? "text-secondary-foreground/80" 
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        item.status === "solution" ? "bg-teal" : "bg-muted-foreground/50"
                      }`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
