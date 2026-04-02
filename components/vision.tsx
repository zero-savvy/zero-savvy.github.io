"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="annotation">Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-balance"
          >
            Default trust for digital content and identity — without centralized surveillance.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            We envision a world where authenticity is verifiable by design, 
            where trust is established through mathematics rather than institutions, 
            and where privacy is preserved even as verification becomes ubiquitous.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
