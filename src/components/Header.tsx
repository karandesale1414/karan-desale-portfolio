import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Terminal, Settings } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

export default function Header({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  showAdmin,
  setShowAdmin
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll logic for glass header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setShowAdmin(false);
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-slate-800/50'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            id="header-logo"
          >
            <div className="p-2 rounded-xl bg-violet-600/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                karan<span className="text-violet-500"> desale</span>
              </span>
              <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400 tracking-wider">PORTFOLIO</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 relative cursor-pointer focus:outline-none ${
                  activeSection === item.id && !showAdmin
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && !showAdmin && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-500 dark:bg-violet-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 cursor-pointer focus:outline-none"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              id="theme-toggle-desktop"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Toggle */}
            <button
              onClick={toggleAdmin}
              className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 font-medium text-sm cursor-pointer focus:outline-none ${
                showAdmin
                  ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
              }`}
              title="Admin Panel"
              id="admin-toggle-desktop"
            >
              <Settings className={`w-4 h-4 ${showAdmin ? 'animate-spin' : ''}`} />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 cursor-pointer focus:outline-none"
              id="theme-toggle-mobile"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleAdmin}
              className={`p-2 rounded-xl border cursor-pointer focus:outline-none ${
                showAdmin ? 'bg-violet-600 text-white border-violet-500' : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
              id="admin-toggle-mobile"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 cursor-pointer focus:outline-none"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[70px] z-30 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg flex flex-col justify-start p-6 border-b border-slate-200 dark:border-slate-800 shadow-2xl h-fit max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">Sections</span>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-4 rounded-xl text-left font-display font-semibold text-lg flex items-center justify-between cursor-pointer focus:outline-none ${
                    activeSection === item.id && !showAdmin
                      ? 'bg-violet-600/10 text-violet-600 dark:text-violet-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && !showAdmin && (
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
