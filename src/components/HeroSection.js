/**
 * HeroSection — Full-viewport hero with 3D neural network background.
 *
 * Displays:
 * - "A.M." as the primary brand moniker
 * - "Data Science & Machine Learning" sub-headline
 * - CTA buttons: GitHub, LinkedIn, Download CV
 * - Three.js NeuralBackground canvas behind all content
 */
'use client';

import { Github, Linkedin, Download } from 'lucide-react';
import styles from './HeroSection.module.css';

/* ── Custom Fiverr SVG Icon ── */
const FiverrIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 4 C10 3 8.5 2.5 7 2.5 C4.5 2.5 3.5 4.5 3.5 7.5 V10 H1.5 V13 H3.5 V21 H7 V13 H10.5 V10 H7 V8 C7 7 7.5 6.5 8.5 6.5 C9 6.5 9.5 6.7 10 7 L11 4 Z" />
    <rect x="13" y="10" width="3.5" height="11" />
    <circle cx="14.75" cy="5.5" r="2.25" />
  </svg>
);

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      {/* ── Hero Content (above canvas) ── */}
      <div className={`container ${styles.content}`}>
        {/* Moniker */}
        <div className={styles.monikerWrapper}>
          <span className={styles.moniker}>T.R.</span>
        </div>

        {/* Name & Title */}
        <h1 className={styles.name}>
          Talha<span className={styles.nameSpacer}> </span>Riaz
        </h1>
        <p className={styles.headline}>
          AI <span className={styles.ampersand}>&</span> Machine Learning
        </p>

        {/* Brief tagline */}
        <p className={styles.tagline}>
          Building intelligent systems with LLMs, RAG architectures, AI Agents, and production-grade machine learning pipelines.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctas}>
          <a
            href="https://github.com/tcintern-021"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="hero-github-btn"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/talha-riaz-259629247"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="hero-linkedin-btn"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="https://www.fiverr.com/talhariaz1746"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="hero-fiverr-btn"
          >
            <FiverrIcon size={18} />
            Fiverr
          </a>
          <a
            href="/Talha_Riaz_Resume.pdf"
            download
            className="btn btn-ghost"
            id="hero-resume-btn"
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href="/Talha_Riaz_CV.pdf"
            download
            className="btn btn-ghost"
            id="hero-cv-btn"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
