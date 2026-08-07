/**
 * Navbar — Fixed glassmorphic navigation bar with mobile hamburger drawer.
 *
 * Features:
 * - "A.M." brand logo linking to hero
 * - Desktop section links with active highlighting via Intersection Observer
 * - Mobile slide-in drawer with backdrop overlay
 * - Scroll-based background opacity (transparent at top, glass on scroll)
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

/* Navigation items matching section IDs */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progressBarRef = useRef(null);

  /* ── Track scroll position for navbar background opacity & progress ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(prev => {
        const isNowScrolled = currentScrollY > 50;
        return prev !== isNowScrolled ? isNowScrolled : prev;
      });
      
      if (progressBarRef.current) {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
        progressBarRef.current.style.width = `${scroll}%`;
      }
    };
    
    handleScroll(); // Init on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Intersection Observer for active section highlighting ── */
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <>
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`container ${styles.navContent}`}>
          {/* ── Brand Logo ── */}
          <a href="#hero" className={styles.brand} aria-label="Go to top">
            T.R.
          </a>

          {/* ── Desktop Links ── */}
          <ul className={styles.desktopLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${
                    activeSection === link.href ? styles.active : ''
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Mobile Hamburger Toggle ── */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Scroll Progress Bar ── */}
        <div 
          ref={progressBarRef}
          className={styles.progressBar}
          style={{ width: '0%' }}
          aria-hidden="true"
        />
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      {isMobileOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />
      )}

      {/* ── Mobile Slide-in Drawer ── */}
      <div
        className={`${styles.mobileDrawer} ${
          isMobileOpen ? styles.drawerOpen : ''
        }`}
      >
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.mobileLink} ${
                  activeSection === link.href ? styles.active : ''
                }`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Talha_Riaz_Resume.pdf"
              download
              className={`btn btn-primary ${styles.mobileResumeBtn}`}
              onClick={handleNavClick}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
