/**
 * ProjectCard — Glassmorphic project card with hover effects.
 *
 * Displays:
 * - Project title
 * - 2-sentence description
 * - Tech stack tags
 * - Outbound action button
 * - Optional "Featured" badge for priority projects
 */
import { ExternalLink, Star, Globe } from 'lucide-react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({
  title,
  description,
  techStack = [],
  url,
  liveUrl,
  featured = false,
}) {
  return (
    <div className={`glass-card ${styles.card} ${featured ? styles.featured : ''}`} id={`${title}`}>
      {/* Featured Badge */}
      {featured && (
        <div className={styles.badge}>
          <Star size={12} />
          Featured
        </div>
      )}

      {/* Card Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Tech Stack Tags */}
      <div className={styles.tags}>
        {techStack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-outline ${styles.action}`}
          style={{ marginTop: 0 }}
        >
        View Project
          <ExternalLink size={14} />
        </a>
        
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.action}`}
            style={{ marginTop: 0 }}
          >
            Live Demo
            <Globe size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
