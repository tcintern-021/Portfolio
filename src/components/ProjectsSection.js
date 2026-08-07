/**
 * ProjectsSection — Responsive grid of all project cards with category filter.
 *
 * Features:
 * - Fixed Kaggle ML projects
 * - Dynamic fetching of GitHub repositories via GitHub API
 * - Category filter tabs: All / ML & Data Science / Mobile Dev / Systems / Web
 * - Responsive 3D glassmorphic grid layout
 */
'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import ProjectCard from './ProjectCard';
import styles from './ProjectsSection.module.css';

/* ── Live Deployment Configuration ── */
const LIVE_PROJECTS = {
  "rag-chat": { enabled: true, subdomain: "rag-chatbot" },
  "Ai-Email-Generator-LangSmith": { enabled: true, subdomain: "ai-email-generator" },
};

function generateSubdomain(repoName) {
  return repoName
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove invalid chars
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function getLiveDemoUrl(repoName, config) {
  if (config.url) return config.url;
  const subdomain = config.subdomain || generateSubdomain(repoName);
  return `https://${subdomain}.thatalhariaz.com`;
}

/* ── Category Constants ── */
const CATEGORIES = {
  ALL: 'All',
  AIML: 'AI & Machine Learning',
  RAG: 'RAG & LLMs',
  AGENTS: 'AI Agents',
  OTHER: 'Other',
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState(CATEGORIES.ALL);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── Fetch GitHub Projects Dynamically ── */
  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/tcintern-021/repos?per_page=100&sort=updated'
        );
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();

        const githubProjects = data
          .filter((repo) => !repo.fork) // Exclude forks
          .map((repo) => {
            let category = CATEGORIES.OTHER;
            const lang = repo.language?.toLowerCase() || '';
            const desc = repo.description?.toLowerCase() || '';
            const topics = repo.topics || [];

            // Check for AI Agents
            if (desc.includes('agent') || topics.includes('ai-agents') || topics.includes('langgraph') || desc.includes('langgraph')) {
              category = CATEGORIES.AGENTS;
            }
            // Check for RAG / LLMs
            else if (desc.includes('rag') || desc.includes('llm') || topics.includes('rag') || topics.includes('llm') || topics.includes('langchain') || desc.includes('langchain')) {
              category = CATEGORIES.RAG;
            }
            // Check for AI / ML
            else if (lang === 'python' || lang === 'jupyter notebook' || desc.includes('ml') || desc.includes('machine learning') || desc.includes('ai') || topics.includes('machine-learning') || topics.includes('ai')) {
              category = CATEGORIES.AIML;
            }

            // Tech stack from language and topics
            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            if (repo.topics) techStack.push(...repo.topics.slice(0, 3));

            const isFeatured = repo.stargazers_count > 0;

            let liveUrl = null;
            const liveConfig = LIVE_PROJECTS[repo.name];
            if (liveConfig && liveConfig.enabled) {
              liveUrl = getLiveDemoUrl(repo.name, liveConfig);
            }

            return {
              title: repo.name.replace(/-/g, ' '),
              description: repo.description || 'An AI/ML project repository.',
              techStack: techStack.length > 0 ? techStack : ['Code'],
              url: repo.html_url,
              liveUrl: liveUrl,
              featured: isFeatured,
              category: category,
            };
          });

        setProjects(githubProjects);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to just Kaggle projects if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  /* ── Filter projects by category ── */
  const filteredProjects =
    activeFilter === CATEGORIES.ALL
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of my AI, ML, and Software Engineering work"
        />

        {/* ── Category Filter Tabs ── */}
        <ScrollReveal>
          <div className={styles.filters}>
            {Object.values(CATEGORIES).map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''
                  }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Loading State ── */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          /* ── Project Cards Grid ── */
          <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.url || project.title} delay={(index % 3) * 60}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  url={project.url}
                  liveUrl={project.liveUrl}
                  featured={project.featured}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
