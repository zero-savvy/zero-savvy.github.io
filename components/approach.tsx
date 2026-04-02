"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Lock, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Monitor,
    title: "Client-side Processing",
    description: "Sensitive data never leaves the user's device. All cryptographic operations occur locally.",
    highlight: "Data stays with you",
  },
  {
    icon: Lock,
    title: "Cryptographic Proofs",
    description: "Generate mathematical proofs that attest to authenticity without revealing underlying content.",
    highlight: "Prove without showing",
  },
  {
    icon: CheckCircle,
    title: "Independent Verification",
    description: "Anyone can verify proofs independently. No centralized authority or trust required.",
    highlight: "Trustless validation",
  },
];

export function Approach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-24 md:py-32 relative bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="code-text tracking-widest uppercase text-sm"
          >
            Our Approach
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
          >
            Privacy-preserving verification{" "}
            <span className="text-primary">at the edge</span>
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
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="relative"
            >
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -z-10" />
              )}

              <div className="p-6 rounded-xl border border-border bg-background relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
                {/* Geometric accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
                
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 relative">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <span className="text-xs font-mono text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
                
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">
                    {step.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-6 rounded-xl border border-border bg-background"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Sensitive data</p>
              <p className="mt-1 font-medium">Never leaves the user</p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-border">
              <p className="text-sm text-muted-foreground">Proofs attest</p>
              <p className="mt-1 font-medium">Authenticity without revealing content</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Verification requires</p>
              <p className="mt-1 font-medium">No centralized trust</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
