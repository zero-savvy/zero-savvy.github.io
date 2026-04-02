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
    <section id="team" className="py-24 md:py-32 relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="annotation">Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-medium tracking-tight max-w-lg"
          >
            The people behind Zero Savvy
          </motion.h2>

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-6 border border-border hover:border-primary/50 transition-colors duration-300 hover-lift"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-sm text-primary mt-1">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
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
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {member.credential}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
