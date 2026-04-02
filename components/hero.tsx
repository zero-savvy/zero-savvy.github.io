"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[70vh]">
          
          {/* Left annotation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 hidden lg:flex flex-col items-end pr-8"
          >
            <div className="flex items-center gap-4">
              <span className="annotation">About</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="mt-3 text-lg text-foreground max-w-[300px] text-right leading-relaxed">
              We build cryptographic infrastructure for verifiable provenance that preserves individuals' privacy
            </p>
          </motion.div>

          {/* Center - Logo with geometric visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center relative"
          >
            {/* Concentric circles */}
            <div className="absolute w-[450px] h-[450px] md:w-[500px] md:h-[500px] rounded-full border border-border/40" />
            <div className="absolute w-[380px] h-[380px] md:w-[400px] md:h-[400px] rounded-full border border-border/60" />
            <div className="absolute w-[280px] h-[280px] md:w-[300px] md:h-[300px] rounded-full border border-border/80 dot-pattern" />
            
            {/* Connection points */}
            <div className="absolute w-3 h-3 bg-foreground rounded-sm top-1/4 right-[10%] md:right-[5%]" />
            <div className="absolute w-3 h-3 bg-foreground rounded-sm bottom-1/3 left-[8%] md:left-[3%]" />
            <div className="absolute w-3 h-3 bg-foreground rounded-sm bottom-[20%] right-[15%] md:right-[10%]" />
            
            {/* Logo */}
            <Image 
              src="/logo.png" 
              alt="Zero Savvy" 
              width={220} 
              height={220}
              className="w-50 h-50 md:w-60 md:h-60 object-contain relative z-10"
              priority
            />
          </motion.div>

          {/* Right annotations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-3 hidden lg:flex flex-col gap-12 pl-8"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="annotation">Open Source</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="mt-3 text-lg text-foreground max-w-[250px] leading-relaxed">
                All core libraries are MIT-licensed. Transparency and auditability are fundamental
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-4">
                <span className="annotation text-xl">Research</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="mt-3 text-lg text-foreground max-w-[250px] leading-relaxed">
                Published at leading security venues (NDSS, PETS, . . .)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="lg:hidden mt-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Cryptographic infrastructure for verifiable provenance
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Building systems that verify authenticity without exposing sensitive data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
