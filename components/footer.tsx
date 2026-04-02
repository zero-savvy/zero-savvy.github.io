"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/zero-savvy",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/zero-savvy",
    icon: Linkedin,
  },
  {
    name: "X",
    href: "https://x.com/zero_savvy",
    icon: Twitter,
  },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Image 
              src="/logo.png" 
              alt="Zero Savvy Logo" 
              width={48} 
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="text-lg font-semibold tracking-tight">
                Zero<span className="text-primary">Savvy</span>
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                Cryptographic infrastructure for verifiable provenance.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Zero Savvy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
