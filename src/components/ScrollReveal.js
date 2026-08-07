/**
 * ScrollReveal — Intersection Observer wrapper for fade-in-on-scroll animations.
 * Wraps child content and applies CSS class `.visible` when element enters viewport.
 *
 * Uses a threshold of 0.15 (15% visibility) and 50px root margin for early trigger.
 */
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /* Once visible, stay visible — no reverse animation */
        if (entry.isIntersecting) {
          /* Apply optional delay for staggered reveals */
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
