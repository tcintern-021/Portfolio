/**
 * SkillsSection — Skills matrix grouped by category.
 *
 * Groups:
 * 1. Core Programming: Python, Java, C++, HTML, CSS, Bootstrap, PHP
 * 2. AI / ML: Machine Learning, Generative AI, LLMs, NLP, RAG, etc.
 * 3. Frameworks & Infrastructure: Git, GitHub, LangChain, LangGraph, FastAPI, Vector Databases, ChromaDB, Firebase, etc.
 */
'use client';

import { Code2, Brain, Settings } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import styles from './SkillsSection.module.css';

/* ── Skill Groups Data ── */
const SKILL_GROUPS = [
  {
    title: 'Core Languages',
    icon: <Code2 size={20} />,
    skills: ['Python', 'Java', 'C++', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'AI & ML',
    icon: <Brain size={20} />,
    skills: [
      'Machine Learning',
      'Generative AI',
      'LLMs',
      'Computer Vision',
      'Time Series Forecasting',
      'NLP',
      'RAG',
      'Prompt Engineering',
    ],
  },
  {
    title: 'Infrastructure & Tools',
    icon: <Settings size={20} />,
    skills: [
      'Git',
      'GitHub',
      'Firebase',
      'LangChain',
      'LangGraph',
      'LangSmith',
      'Embeddings',
      'Vector Databases',
      'ChromaDB',
      'Retrieval Pipelines',
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and frameworks I work with"
        />

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, groupIdx) => (
            <ScrollReveal key={group.title} delay={groupIdx * 100}>
              <div className={`glass-card ${styles.groupCard}`}>
                {/* Group Header */}
                <div className={styles.groupHeader}>
                  <span className={styles.groupIcon}>{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>

                {/* Skill Pills */}
                <div className={styles.skillPills}>
                  {group.skills.map((skill, skillIdx) => (
                    <span
                      key={skill}
                      className="glass-pill"
                      style={{
                        animationDelay: `${skillIdx * 50}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
