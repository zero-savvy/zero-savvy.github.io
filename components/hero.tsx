"use client";

import { motion } from "framer-motion";
import { CryptoFlowAnimation } from "./crypto-flow-animation";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements - geometric patterns */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 facet-pattern" />
      <div className="absolute inset-0 gradient-radial" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="code-text tracking-widest uppercase"
            >
              Cryptographic Infrastructure
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-balance"
            >
              Trustworthy Provenance,{" "}
              <span className="text-primary glow-text">without Surveillance</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Cryptographic infrastructure for verifying the authenticity of media 
              and identity — without exposing personal data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mt-4"
            >
              <a
                href="#approach"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Learn More
              </a>
              <a
                href="https://github.com/zero-savvy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-border text-foreground rounded-lg hover:bg-accent transition-colors duration-200"
              >
                View GitHub
              </a>
            </motion.div>
          </div>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <CryptoFlowAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
