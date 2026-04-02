"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Verification without disclosure",
    description: "Prove authenticity without revealing the underlying content or metadata.",
  },
  {
    number: "02", 
    title: "Minimal trust assumptions",
    description: "No centralized authorities. Mathematical guarantees replace institutional trust.",
  },
  {
    number: "03",
    title: "Open validation",
    description: "Anyone can independently verify proofs. No gatekeepers required.",
  },
];

export function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16">
          {/* Left - Mission statement */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-foreground" />
              <span className="annotation">Mission</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium tracking-tight leading-tight"
            >
              Building infrastructure for verifiable provenance that preserves individuals&apos; privacy.
            </motion.h2>
          </div>

          {/* Right - Pillars */}
          <div className="flex flex-col gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex gap-6"
              >
                <span className="text-sm font-mono text-muted-foreground">{pillar.number}</span>
                <div>
                  <h3 className="font-medium">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
