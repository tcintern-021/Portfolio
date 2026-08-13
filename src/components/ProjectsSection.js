/**
 * ProjectsSection — Responsive grid of project cards with section selection (Personal / Think & Code)
 * and category filter.
 *
 * Features:
 * - Dual section selection: Personal (talha-riaz-1746) and Think & Code (tcintern-021)
 * - Dynamic fetching of GitHub repositories via GitHub API for both accounts
 * - Category filter tabs: All / AI & Machine Learning / RAG & LLMs / AI Agents / Mobile Dev / Systems & OS / Web / Other
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
  "Pakistan-Law-RAG-Assistant": { enabled: true, subdomain: "pakistan-law-rag-assistant" },
  "profile": { enabled: true, url: "https://thetalhariaz.com" },
  "Portfolio": { enabled: true, url: "https://thetalhariaz.com" },
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
  return `https://${subdomain}.thetalhariaz.com`;
}

/* ── Section Constants ── */
const SECTIONS = {
  PERSONAL: 'Personal',
  THINK_CODE: 'Think & Code',
};

/* ── Category Constants ── */
const CATEGORIES = {
  ALL: 'All',
  AIML: 'AI & Machine Learning',
  RAG: 'RAG & LLMs',
  AGENTS: 'AI Agents',
  MOBILE: 'Mobile Dev',
  SYSTEMS: 'Systems & OS',
  WEB: 'Web',
  OTHER: 'Other',
};

function processRepoData(data) {
  return data
    .filter((repo) => !repo.fork) // Exclude forks
    .map((repo) => {
      let category = CATEGORIES.OTHER;
      const lang = repo.language?.toLowerCase() || '';
      const desc = repo.description?.toLowerCase() || '';
      const topics = repo.topics || [];

      // Categorization check
      if (
        desc.includes('agent') ||
        topics.includes('ai-agents') ||
        topics.includes('langgraph') ||
        desc.includes('langgraph')
      ) {
        category = CATEGORIES.AGENTS;
      } else if (
        desc.includes('rag') ||
        desc.includes('llm') ||
        topics.includes('rag') ||
        topics.includes('llm') ||
        topics.includes('langchain') ||
        desc.includes('langchain')
      ) {
        category = CATEGORIES.RAG;
      } else if (
        lang === 'python' ||
        lang === 'jupyter notebook' ||
        desc.includes('ml') ||
        desc.includes('machine learning') ||
        desc.includes('ai') ||
        topics.includes('machine-learning') ||
        topics.includes('ai') ||
        topics.includes('data-science')
      ) {
        category = CATEGORIES.AIML;
      } else if (
        lang === 'swift' ||
        lang === 'kotlin' ||
        desc.includes('mobile') ||
        desc.includes('flutter') ||
        desc.includes('android') ||
        desc.includes('ios') ||
        topics.includes('mobile') ||
        topics.includes('flutter') ||
        topics.includes('react-native')
      ) {
        category = CATEGORIES.MOBILE;
      } else if (
        lang === 'c' ||
        lang === 'c++' ||
        lang === 'rust' ||
        lang === 'go' ||
        desc.includes('kernel') ||
        desc.includes('system') ||
        desc.includes('os') ||
        topics.includes('systems') ||
        topics.includes('operating-system')
      ) {
        category = CATEGORIES.SYSTEMS;
      } else if (
        lang === 'javascript' ||
        lang === 'typescript' ||
        lang === 'html' ||
        lang === 'css' ||
        desc.includes('web') ||
        desc.includes('frontend') ||
        desc.includes('fullstack') ||
        topics.includes('react') ||
        topics.includes('nextjs') ||
        topics.includes('web')
      ) {
        category = CATEGORIES.WEB;
      }

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
        title: repo.name.replace(/[-_]/g, ' '),
        description: repo.description || 'A software project repository.',
        techStack: techStack.length > 0 ? techStack : ['Code'],
        url: repo.html_url,
        liveUrl: liveUrl,
        featured: isFeatured,
        category: category,
      };
    });
}

export default function ProjectsSection() {
  const [activeSection, setActiveSection] = useState(SECTIONS.PERSONAL);
  const [activeFilter, setActiveFilter] = useState(CATEGORIES.ALL);
  const [personalProjects, setPersonalProjects] = useState([]);
  const [thinkCodeProjects, setThinkCodeProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        const [personalRes, thinkCodeRes] = await Promise.all([
          fetch('https://api.github.com/users/talha-riaz-1746/repos?per_page=100&sort=updated'),
          fetch('https://api.github.com/users/tcintern-021/repos?per_page=100&sort=updated'),
        ]);

        let personalData = [];
        let thinkCodeData = [];

        if (personalRes.ok) {
          personalData = await personalRes.json();
        } else {
          console.error('Failed to fetch personal repos:', personalRes.statusText);
        }

        if (thinkCodeRes.ok) {
          thinkCodeData = await thinkCodeRes.json();
        } else {
          console.error('Failed to fetch think & code repos:', thinkCodeRes.statusText);
        }

        setPersonalProjects(processRepoData(personalData));
        setThinkCodeProjects(processRepoData(thinkCodeData));
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  const currentSectionProjects =
    activeSection === SECTIONS.PERSONAL ? personalProjects : thinkCodeProjects;

  /* ── Filter projects by category ── */
  const filteredProjects =
    activeFilter === CATEGORIES.ALL
      ? currentSectionProjects
      : currentSectionProjects.filter((p) => p.category === activeFilter);

  // Available categories in the current section
  const sectionCategories = [
    CATEGORIES.ALL,
    ...Object.values(CATEGORIES).filter(
      (cat) => cat !== CATEGORIES.ALL && currentSectionProjects.some((p) => p.category === cat)
    ),
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of work across machine learning, mobile, and systems"
        />

        {/* ── Main Section Selector Tabs (Personal vs Think & Code) ── */}
        <ScrollReveal>
          <div className={styles.sectionSelector}>
            {Object.values(SECTIONS).map((sec) => (
              <button
                key={sec}
                className={`${styles.sectionBtn} ${
                  activeSection === sec ? styles.active : ''
                }`}
                onClick={() => {
                  setActiveSection(sec);
                  setActiveFilter(CATEGORIES.ALL);
                }}
              >
                {sec}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Category Filter Tabs ── */}
        <ScrollReveal>
          <div className={styles.filters}>
            {sectionCategories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeFilter === cat ? styles.active : ''
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
            <Loader2
              size={32}
              className="animate-spin"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </div>
        ) : (
          /* ── Project Cards Grid ── */
          <div className={styles.grid}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
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
              ))
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                No projects found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

