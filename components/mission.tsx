"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Minimize2, Globe } from "lucide-react";

const principles = [
  {
    icon: ShieldCheck,
    title: "Verification without disclosure",
    description: "Prove authenticity without revealing sensitive content",
  },
  {
    icon: Minimize2,
    title: "Minimal trust assumptions",
    description: "Cryptographic guarantees over institutional promises",
  },
  {
    icon: Globe,
    title: "Open validation",
    description: "Anyone can verify, no gatekeepers required",
  },
];

export function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="code-text tracking-widest uppercase text-sm"
            >
              Mission
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
            >
              Building infrastructure for verifiable provenance that{" "}
              <span className="text-primary">preserves privacy</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              Our mission is to develop the cryptographic primitives and systems 
              that enable verification of digital content provenance while 
              preserving the privacy of individuals and the integrity of their data.
            </motion.p>
          </div>

          {/* Right content - Principles */}
          <div className="flex flex-col gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex gap-4 p-4 rounded-lg border border-border bg-background/50"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <principle.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{principle.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {principle.description}
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
