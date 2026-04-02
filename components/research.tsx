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
    <section id="research" className="py-24 md:py-32 relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="annotation">Research</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-medium tracking-tight"
              >
                Grounded in academic rigor
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

            <div className="grid gap-6">
              {credentials.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex gap-5 p-6 border border-border hover:border-primary/50 transition-colors duration-300 hover-lift"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
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
