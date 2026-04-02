"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Github, GraduationCap } from "lucide-react";

const credentials = [
  {
    icon: FileText,
    title: "Peer-Reviewed Publications",
    description: "Published at top venues including PETS, NDSS, and other leading security conferences.",
  },
  {
    icon: Github,
    title: "Open Source",
    description: "All core libraries are MIT-licensed. Transparency and auditability are fundamental.",
  },
  {
    icon: GraduationCap,
    title: "Academic Foundation",
    description: "Team with deep background in cryptography research and formal methods.",
  },
];

export function Research() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research" className="py-24 md:py-32 relative bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="code-text tracking-widest uppercase text-sm"
          >
            Research
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
          >
            Grounded in{" "}
            <span className="text-primary">academic rigor</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed"
          >
            Our work is built on peer-reviewed research and open-source 
            principles. We believe cryptographic infrastructure must be 
            transparent and verifiable.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {credentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
