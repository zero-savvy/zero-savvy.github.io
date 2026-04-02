"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CryptoFlowAnimation() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      {/* Outer concentric arcs - matching logo style */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Outer arc */}
        <motion.path
          d="M 60 200 A 140 140 0 0 1 340 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        {/* Middle arc */}
        <motion.path
          d="M 90 200 A 110 110 0 0 1 310 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        {/* Inner arc */}
        <motion.path
          d="M 120 200 A 80 80 0 0 1 280 200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        {/* Radiating lines - teal accent */}
        <motion.line
          x1="200" y1="60" x2="200" y2="120"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.line
          x1="100" y1="100" x2="140" y2="140"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
        <motion.line
          x1="300" y1="100" x2="260" y2="140"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />
        <motion.line
          x1="50" y1="200" x2="110" y2="200"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
        <motion.line
          x1="350" y1="200" x2="290" y2="200"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />

        {/* Animated particles flowing along arcs */}
        <motion.circle
          r="4"
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 1.5,
          }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 60 200 A 140 140 0 0 1 340 200"
            begin="1.5s"
          />
        </motion.circle>
        <motion.circle
          r="3"
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 2,
          }}
        >
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 90 200 A 110 110 0 0 1 310 200"
            begin="2s"
          />
        </motion.circle>
      </svg>

      {/* Central logo with glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        className="relative z-10"
      >
        <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
        <Image
          src="/logo.png"
          alt="Zero Savvy"
          width={180}
          height={180}
          className="relative z-10 w-44 h-44 object-contain drop-shadow-[0_0_30px_rgba(94,234,212,0.3)]"
        />
      </motion.div>

      {/* Corner geometric accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-primary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-primary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary"
      />
    </div>
  );
}
