"use client";

import { motion } from "framer-motion";
import { Shield, FileCheck, Lock, Eye, EyeOff } from "lucide-react";

export function CryptoFlowAnimation() {
  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Central verification node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow"
      >
        <Shield className="w-10 h-10 text-primary" />
      </motion.div>

      {/* Orbiting elements */}
      <div className="absolute inset-0">
        {/* Data input node */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-8 left-4 flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">Data</span>
        </motion.div>

        {/* Proof generation node */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute top-4 right-8 flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">Proof</span>
        </motion.div>

        {/* Privacy node */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="absolute bottom-8 right-4 flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
            <EyeOff className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">Private</span>
        </motion.div>

        {/* Verification node */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="absolute bottom-4 left-8 flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
            <Eye className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">Verify</span>
        </motion.div>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Lines connecting to center */}
        <motion.path
          d="M 80 80 L 200 200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        <motion.path
          d="M 320 80 L 200 200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.3 }}
        />
        <motion.path
          d="M 320 320 L 200 200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.4 }}
        />
        <motion.path
          d="M 80 320 L 200 200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-border"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Animated dots along paths */}
        <motion.circle
          r="3"
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 2,
          }}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path="M 80 80 L 200 200"
            begin="2s"
          />
        </motion.circle>
        <motion.circle
          r="3"
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 2.5,
          }}
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path="M 200 200 L 320 320"
            begin="2.5s"
          />
        </motion.circle>
      </svg>

      {/* Outer ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-4 rounded-full border border-border/50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-12 rounded-full border border-border/30"
      />
    </div>
  );
}
