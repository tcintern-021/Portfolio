/**
 * Root Layout — Abdullah Mehmood Portfolio
 * Provides global fonts, metadata, and HTML structure for the entire app.
 */
import './globals.css';
import ChunkErrorHandler from '../components/ChunkErrorHandler';

/* ── SEO & Open Graph Metadata ── */
export const metadata = {
  title: 'T.R. | Talha Riaz — AI/ML Engineer',
  description:
    'Portfolio of Talha Riaz — AI/ML Engineer specializing in Machine Learning, Generative AI, LLMs, RAG, and AI Agents.',
  keywords: [
    'Talha Riaz',
    'AI Engineer',
    'Machine Learning',
    'Generative AI',
    'LLMs',
    'RAG',
    'AI Agents',
    'Computer Vision',
    'Portfolio',
    'Python',
  ],
  authors: [{ name: 'Talha Riaz' }],
  openGraph: {
    title: 'T.R. | Talha Riaz — AI/ML Engineer',
    description:
      'AI/ML Engineer focused on modern AI systems, LLMs, and RAG pipelines.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T.R. | Talha Riaz',
    description: 'AI/ML Engineering Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * RootLayout wraps every page in the app.
 * Applies Inter as the primary sans-serif font via CSS @import in globals.css.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ChunkErrorHandler />
        {children}
      </body>
    </html>
  );
}
