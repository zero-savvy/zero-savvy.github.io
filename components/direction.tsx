"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ImageIcon, MessageSquare, User, ArrowRight } from "lucide-react";

const domains = [
  {
    icon: ImageIcon,
    label: "Media",
    description: "Verifiable authenticity for images, video, and audio content.",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    description: "Trusted provenance for messages and digital correspondence.",
  },
  {
    icon: User,
    label: "Identity",
    description: "Privacy-preserving verification of credentials and attributes.",
  },
];

export function Direction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="code-text tracking-widest uppercase text-sm"
            >
              Long-Term Direction
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance"
            >
              The infrastructure layer for{" "}
              <span className="text-primary">digital authenticity</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              We are building foundational infrastructure that enables 
              privacy-preserving verification across systems. Our goal is to 
              make verifiable authenticity the default — not the exception.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center gap-2 text-primary"
            >
              <span className="text-sm font-medium">Enabling trust without compromise</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Right content - Domains */}
          <div className="flex flex-col gap-4">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <domain.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{domain.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {domain.description}
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
