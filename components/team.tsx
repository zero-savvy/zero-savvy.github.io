"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github } from "lucide-react";

const team = [
  {
    name: "Saba Eskandarian",
    role: "Co-founder",
    credential: "Assistant Professor at UNC Chapel Hill. PhD from Stanford.",
    linkedin: "https://linkedin.com/in/sabaeskandarian",
    github: "https://github.com/sabaeskandarian",
  },
  {
    name: "Hossein Ebrahimi",
    role: "Co-founder",
    credential: "PhD Candidate at UNC Chapel Hill. MSc from Sharif University of Technology.",
    linkedin: "https://linkedin.com/in/sh-ebrahimi",
    github: "https://github.com/sh-ebrahimi",
  },
];

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 md:py-32 relative bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="code-text tracking-widest uppercase text-sm"
          >
            Team
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight"
          >
            The people behind Zero Savvy
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background relative overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              {/* Crystalline corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-300" />
              
              <div className="flex items-start justify-between relative">
                <div>
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {member.credential}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
