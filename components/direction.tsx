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
            <span className="annotation">Long-Term Direction</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-medium tracking-tight"
              >
                The infrastructure layer for digital authenticity
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
                className="mt-8 flex items-center gap-2"
              >
                <span className="text-sm font-medium">Enabling trust without compromise</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </motion.div>
            </div>

            {/* Domains */}
            <div className="flex flex-col gap-4">
              {domains.map((domain, index) => (
                <motion.div
                  key={domain.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-5 p-6 border border-border hover:border-primary/50 transition-colors duration-300 hover-lift"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border">
                    <domain.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{domain.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {domain.description}
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
