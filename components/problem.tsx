"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, AlertTriangle, Check } from "lucide-react";

const comparisons = [
  {
    approach: "Traditional Provenance",
    issues: [
      "Requires trusting centralized authorities",
      "Exposes sensitive metadata and content",
      "Vulnerable to institutional compromise",
    ],
    status: "problematic",
  },
  {
    approach: "AI Detection",
    issues: [
      "Probabilistic, not deterministic",
      "Arms race with generative models",
      "High false positive/negative rates",
    ],
    status: "problematic",
  },
  {
    approach: "Zero-Knowledge Provenance",
    issues: [
      "Mathematically verifiable",
      "Privacy-preserving by design",
      "No centralized trust required",
    ],
    status: "solution",
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="code-text tracking-widest uppercase text-sm"
          >
            The Problem
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
          >
            The false choice between{" "}
            <span className="text-primary">authenticity and privacy</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed"
          >
            Deepfakes and manipulated media erode trust in digital content. 
            Current solutions force a trade-off: verify authenticity at the cost 
            of privacy, or preserve privacy without reliable verification.
          </motion.p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.approach}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`p-6 rounded-xl border ${
                item.status === "solution"
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-card/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {item.status === "solution" ? (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                )}
                <h3 className="font-medium">{item.approach}</h3>
              </div>

              <ul className="space-y-3">
                {item.issues.map((issue) => (
                  <li key={issue} className="flex items-start gap-2 text-sm">
                    {item.status === "solution" ? (
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span className={item.status === "solution" ? "text-foreground" : "text-muted-foreground"}>
                      {issue}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
