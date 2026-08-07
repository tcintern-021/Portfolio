/**
 * Footer — Minimal site footer with copyright, social links, and quick nav.
 */
import { Github, Linkedin, Heart } from 'lucide-react';
import styles from './Footer.module.css';

/* ── Custom Fiverr SVG Icon ── */
const FiverrIcon = ({ size = 20 }) => (
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        {/* ── Brand ── */}
        <div className={styles.brand}>
          <a href="#hero" className={styles.logo}>
            T.R.
          </a>
          <p className={styles.tagline}>AI & Machine Learning</p>
        </div>

        {/* ── Quick Nav Links ── */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* ── Social Links ── */}
        <div className={styles.socials}>
          <a
            href="https://github.com/tcintern-021"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={styles.socialLink}
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/talha-riaz-259629247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={styles.socialLink}
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.fiverr.com/talhariaz1746"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fiverr profile"
            className={styles.socialLink}
          >
            <FiverrIcon size={20} />
          </a>
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} />

        {/* ── Copyright ── */}
        <p className={styles.copyright}>
          © {currentYear} Talha Riaz. Built with{' '}
          <Heart size={14} className={styles.heart} /> and Next.js
        </p>
      </div>
    </footer>
  );
}
