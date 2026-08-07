/**
 * AboutSection — Professional narrative about Abdullah's career trajectory.
 *
 * Highlights:
 * - Technical journey: Python → APIs → LLMs → RAG → AI Agents
 * - Technical pivot from web development → ML/Data Science
 * - Education: BSCS from University of Lahore (3.06 CGPA)
 * - Focus on modern AI systems and production-grade applications
 * - [Update with your actual education/certifications]
 */
'use client';

import {
  GraduationCap,
  BrainCircuit,
  ShieldCheck,
  Trophy,
  Code2,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import styles from './AboutSection.module.css';

/* ── Education & Certification data ── */
const EDUCATION = {
  institution: 'University of Lahore',
  campus: 'Sargodha Campus',
  degree: 'Bachelor of Science in Computer Science',
  period: '2022 – 2026',
  cgpa: '3.06 / 4.0',
};

const CERTIFICATIONS = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '7-02-2026',
    credential: '[Credential ID]',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          title="About"
          subtitle="From websites to AI: Building practical AI systems for the real world"
        />

        <div className={styles.grid}>
          {/* ── Main Narrative ── */}
          <ScrollReveal>
            <div className={`glass-card ${styles.narrative}`}>
              <div className={styles.narrativeIcon}>
                <BrainCircuit size={28} />
              </div>
              <h3>The Pivot</h3>
              <p>
                My technical journey began with a strong foundation in basic web development . This experience provided the stepping stones that naturally evolved into a deep passion for Machine Learning and Artificial Intelligence. Today, I am fully focused on architecting and deploying modern AI applications.
              </p>
              <p>
                Operating professionally as T.R., I specialize in Generative AI, Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG) pipelines. Using frameworks like LangChain, LangGraph, and FastAPI, I build intelligent agents and production-ready systems that solve complex, real-world problems. My focus is strictly on transforming raw data and foundational models into robust, actionable, and scalable AI solutions.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Right Column: Education + Certs + Achievement ── */}
          <div className={styles.rightColumn}>
            {/* Education Card */}
            <ScrollReveal delay={100}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <GraduationCap size={22} />
                  <h3>Education</h3>
                </div>
                <div className={styles.eduDetails}>
                  <p className={styles.institution}>
                    {EDUCATION.institution}
                  </p>
                  <p className={styles.campus}>{EDUCATION.campus}</p>
                  <p className={styles.degree}>{EDUCATION.degree}</p>
                  <div className={styles.eduMeta}>
                    <span className="tag">{EDUCATION.period}</span>
                    <span className="tag">CGPA: {EDUCATION.cgpa}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Achievement Card */}
            <ScrollReveal delay={200}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <Trophy size={22} />
                  <h3>Achievement</h3>
                </div>
                <p className={styles.achievementText}>
                  Secured <strong>3rd position</strong> in the Speed Programming
                  Competition at the University of Lahore.
                </p>
              </div>
            </ScrollReveal>

            {/* Certifications Card */}
            <ScrollReveal delay={300}>
              <div className={`glass-card ${styles.infoCard}`}>
                <div className={styles.cardHeader}>
                  <ShieldCheck size={22} />
                  <h3>Certifications</h3>
                </div>
                <ul className={styles.certList}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <li key={i} className={styles.certItem}>
                      <span className={styles.certTitle}>{cert.title}</span>
                      <span className={styles.certMeta}>
                        {cert.issuer} · {cert.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
