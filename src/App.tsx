import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, Flame, ShieldCheck, Instagram, Twitter, Youtube, Facebook, Globe, Link } from 'lucide-react';

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'GitHub': return Github;
    case 'LinkedIn': return Linkedin;
    case 'Instagram': return Instagram;
    case 'Twitter (X)': return Twitter;
    case 'Email': return Mail;
    case 'Portfolio': return Globe;
    case 'YouTube': return Youtube;
    case 'Facebook': return Facebook;
    default: return Link;
  }
};

// Components
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import TimelineSection from './components/TimelineSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import Custom404 from './components/Custom404';

// Data Store
import { portfolioStore } from './data/portfolioStore';
import { Project, Skill, Certificate, BlogPost, TimelineItem, SocialLink } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or default to true for premium dark feel
    const stored = localStorage.getItem('portfolio_dark_mode');
    return stored ? stored === 'true' : true;
  });

  // Main active sections trackers
  const [activeSection, setActiveSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const [show404, setShow404] = useState(false);

  // Dynamic portfolio states (live updated from Admin panel!)
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [resume, setResume] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  // Load all dynamic records
  const loadPortfolioData = () => {
    setProjects(portfolioStore.getProjects() || []);
    setSkills(portfolioStore.getSkills() || []);
    setCertificates(portfolioStore.getCertificates() || []);
    setBlogs(portfolioStore.getBlogs() || []);
    setTimeline(portfolioStore.getTimeline() || []);
    setResume(portfolioStore.getResume());
    setProfile(portfolioStore.getProfile());
    setSocialLinks(portfolioStore.getSocialLinks() || []);
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Mouse Glow Position Tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Progress Tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Sync dark class on root document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio_dark_mode', String(darkMode));
  }, [darkMode]);

  // Section observer to update navigation indicators automatically during scroll
  useEffect(() => {
    if (showAdmin || show404) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger near center screen
      threshold: 0
    });

    const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'timeline', 'blog', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [showAdmin, show404]);

  // Back to top scroll state
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScrollButton = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper trigger Contact CTA
  const handleContactCTA = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  // Resume Download helper
  const handleResumeDownload = () => {
    if (resume?.url) {
      // Trigger native download
      const link = document.createElement('a');
      link.href = resume.url;
      link.download = resume.fileName || 'Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-violet-500/30 relative">
      
      {/* Top viewport scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-600 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Dynamic interactive background mouse glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-0 dark:opacity-35"
        style={{
          background: `radial-gradient(650px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.07), transparent 80%)`
        }}
      />
      
      {/* Loading Intro Toggler */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex flex-col min-h-screen">
          
          {/* Header Panel */}
          {!show404 && (
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              showAdmin={showAdmin}
              setShowAdmin={setShowAdmin}
            />
          )}

          {/* Core App View switcher */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {show404 ? (
                <motion.div
                  key="404"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Custom404 onBackHome={() => setShow404(false)} />
                </motion.div>
              ) : showAdmin ? (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdminPanel onDataChange={loadPortfolioData} />
                </motion.div>
              ) : (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Portfolio Core Sections */}
                  <HomeSection 
                    onContactClick={handleContactCTA} 
                    onResumeClick={handleResumeDownload} 
                    resumeFileName={resume?.fileName || 'Resume.pdf'}
                    profile={profile}
                    socialLinks={socialLinks}
                  />
                  <AboutSection 
                    projects={projects} 
                    certificates={certificates} 
                    blogs={blogs} 
                  />
                  <SkillsSection skills={skills} />
                  <ProjectsSection projects={projects} />
                  <CertificatesSection certificates={certificates} />
                  <TimelineSection timeline={timeline} />
                  <BlogSection blogs={blogs} />
                  <ContactSection />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer bar */}
          {!show404 && (
            <footer className="py-12 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/30 relative overflow-hidden text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                
                {/* Brand info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                    karan<span className="text-violet-500"> desale</span>
                  </span>
                  <p className="font-sans text-xs text-slate-500 mt-1.5">
                    © 2026 Karan Desale. All rights reserved. Built with React & Tailwind CSS.
                  </p>
                </div>

                {/* Footer Center Links */}
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <button 
                    onClick={() => { setShowAdmin(false); setShow404(false); scrollToTop(); }}
                    className="hover:text-violet-500 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span>•</span>
                  <button 
                    onClick={() => setShow404(true)}
                    className="hover:text-violet-500 transition-colors cursor-pointer"
                    id="footer-404-link"
                  >
                    Test 404 View
                  </button>
                  <span>•</span>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    className="hover:text-violet-500 transition-colors"
                  >
                    Sitemap
                  </a>
                  <span>•</span>
                  <a 
                    href="/robots.txt" 
                    target="_blank" 
                    className="hover:text-violet-500 transition-colors"
                  >
                    robots.txt
                  </a>
                </div>

                {/* Footer Socials */}
                {socialLinks.filter(link => link.url && link.url.trim() !== '').length > 0 && (
                  <div className="flex items-center gap-3">
                    {socialLinks
                      .filter(link => link.url && link.url.trim() !== '')
                      .map((link) => {
                        const IconComponent = getSocialIcon(link.platform);
                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:text-violet-500 hover:scale-105 transition-all shadow-sm"
                            id={`footer-${link.platform.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                            aria-label={`${link.platform} Profile`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </a>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Verified badge */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-200/40 dark:border-slate-800/20 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 gap-4">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
                  <span>SECURE ACCESS KEY PROTECTED</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-fuchsia-500" />
                  <span>PREMIUM GLASSMORPHIC ARCHITECTURE</span>
                </div>
              </div>
            </footer>
          )}

          {/* Floating Back to Top Scroll Widget */}
          <AnimatePresence>
            {showScrollTop && !show404 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/20 cursor-pointer focus:outline-none transition-all hover:scale-105"
                title="Scroll back to top"
                id="back-to-top-floating-btn"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
