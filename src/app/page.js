/**
 * Home Page — Single-page portfolio composition.
 *
 * Assembles all section components into one scrollable page:
 * Hero → About → Skills → Projects → Contact → Footer
 *
 * The Navbar is fixed and sits above all content.
 */
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import NeuralBackground from '../components/NeuralBackground';

export default function Home() {
  return (
    <>
      <NeuralBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
