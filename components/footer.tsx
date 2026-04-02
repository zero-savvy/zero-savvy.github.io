"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, XIcon } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#approach", label: "Approach" },
  { href: "#research", label: "Research" },
  { href: "#team", label: "Team" },
];

const socialLinks = [
  {
    name: "Social",
    href: "https://x.com/zero_savvy",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/zero-savvy",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/zero-savvy",
    icon: Github,
  },
];

export function Footer() {
  return (
    <footer className="dark-section py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Image 
              src="/dark-logo.png" 
              alt="Zero Savvy" 
              width={64} 
              height={64}
              className="w-16 h-16 object-contain"
            />
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Cryptographic infrastructure for verifiable provenance that preserves individuals&apos; privacy.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Contact
            </h4>
            <a
              href="mailto:contact@zerosavvy.xyz"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              contact@zerosavvy.xyz
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Zero Savvy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
