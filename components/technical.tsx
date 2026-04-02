"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "Zero-Knowledge Proofs",
    description: "Prove statements about data without revealing the data itself.",
    notation: "prove(statement) -> pi",
  },
  {
    name: "Commitment Schemes",
    description: "Bind to values cryptographically while keeping them hidden.",
    notation: "commit(m, r) -> C",
  },
  {
    name: "Recursive Proofs",
    description: "Compose proofs efficiently. Verify complex chains in constant time.",
    notation: "verify(pi_1, pi_2) -> pi",
  },
];

export function Technical() {
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
            <span className="annotation">Technical Foundation</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-medium tracking-tight"
              >
                Built on rigorous cryptography
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
                className="mt-10 p-6 bg-secondary text-secondary-foreground font-mono text-sm"
              >
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-secondary-foreground/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-foreground/30" />
                </div>
                <code className="text-secondary-foreground/80 text-xs leading-relaxed">
                  <span className="text-teal">$</span> verify --proof media.zkp
                  <br />
                  <span className="text-secondary-foreground/50">{">"} Loading proof... </span>
                  <span className="text-teal">done</span>
                  <br />
                  <span className="text-secondary-foreground/50">{">"} Verifying constraints... </span>
                  <span className="text-teal">passed</span>
                  <br />
                  <span className="text-secondary-foreground/50">{">"} Checking commitment... </span>
                  <span className="text-teal">valid</span>
                  <br />
                  <br />
                  <span className="text-teal">Verification successful</span>
                </code>
              </motion.div>
            </div>

            {/* Technologies */}
            <div className="flex flex-col gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-6 border border-border hover:border-primary/50 transition-colors duration-300 hover-lift"
                >
                  <h3 className="font-medium">{tech.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <code className="text-xs font-mono text-primary">{tech.notation}</code>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
