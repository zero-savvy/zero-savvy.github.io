"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Client-side Processing",
    description: "Sensitive data never leaves the user's device. All cryptographic operations occur locally.",
    highlight: "Data stays with you",
  },
  {
    number: "02",
    title: "Cryptographic Proofs",
    description: "Generate mathematical proofs that attest to authenticity without revealing underlying content.",
    highlight: "Prove without showing",
  },
  {
    number: "03",
    title: "Independent Verification",
    description: "Anyone can verify proofs independently. No centralized authority or trust required.",
    highlight: "Trustless validation",
  },
];

export function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-24 md:py-32 relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="annotation">Our Approach</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-medium tracking-tight"
              >
                Privacy-preserving verification at the edge
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-muted-foreground leading-relaxed"
              >
                Our architecture ensures that verification never requires exposing 
                the content being verified. Proofs are compact, portable, and 
                independently verifiable.
              </motion.p>

              {/* Key points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 space-y-4"
              >
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span>Sensitive data never leaves the user</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span>Proofs attest authenticity without revealing content</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span>No centralized trust required</span>
                </div>
              </motion.div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-6 border border-border hover:border-primary/50 transition-colors duration-300 hover-lift"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{step.number}</span>
                    <span className="text-xs font-mono text-primary">{step.highlight}</span>
                  </div>
                  <h3 className="mt-4 font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
