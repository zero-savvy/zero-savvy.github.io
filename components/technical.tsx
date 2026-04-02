"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "Zero-Knowledge Proofs",
    description:
      "Prove statements about data without revealing the data itself. Mathematical certainty without disclosure.",
    code: "prove(statement) → π",
  },
  {
    name: "Commitment Schemes",
    description:
      "Bind to values cryptographically while keeping them hidden. Reveal only when necessary.",
    code: "commit(m, r) → C",
  },
  {
    name: "Recursive Proofs",
    description:
      "Compose proofs efficiently. Verify complex chains of operations in constant time.",
    code: "verify(π₁, π₂) → π",
  },
];

export function Technical() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="code-text tracking-widest uppercase text-sm"
            >
              Technical Foundation
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
            >
              Built on{" "}
              <span className="text-primary">rigorous cryptography</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              Our systems are grounded in well-established cryptographic 
              primitives with formal security guarantees. We build on decades 
              of academic research to deliver practical, secure solutions.
            </motion.p>

            {/* Terminal-style code block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-4 rounded-lg bg-card border border-border font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
              <code className="text-muted-foreground">
                <span className="text-primary">$</span> verify --proof media.zkp
                <br />
                <span className="text-muted-foreground/60">{">"} Loading proof... </span>
                <span className="text-primary">done</span>
                <br />
                <span className="text-muted-foreground/60">{">"} Verifying constraints... </span>
                <span className="text-primary">passed</span>
                <br />
                <span className="text-muted-foreground/60">{">"} Checking commitment... </span>
                <span className="text-primary">valid</span>
                <br />
                <br />
                <span className="text-primary">Verification successful</span>
                <br />
                <span className="text-muted-foreground/60">Authenticity confirmed without data exposure</span>
              </code>
            </motion.div>
          </div>

          {/* Right content - Technologies */}
          <div className="flex flex-col gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card/50 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300"
              >
                {/* Geometric corner accent */}
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
                
                <div className="flex items-start justify-between gap-4 relative">
                  <div>
                    <h3 className="font-medium">{tech.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <code className="text-sm font-mono text-primary">{tech.code}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
