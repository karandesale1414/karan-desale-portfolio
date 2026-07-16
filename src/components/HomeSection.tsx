import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, FileText, ArrowRight, Sparkles, Code2, Instagram, Twitter, Youtube, Facebook, Globe, Mail, Link, FolderKanban } from 'lucide-react';

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

interface HomeSectionProps {
  onContactClick: () => void;
  onResumeClick: () => void;
  resumeFileName: string;
  profile?: any;
  socialLinks?: any[];
}

export default function HomeSection({ onContactClick, onResumeClick, resumeFileName, profile, socialLinks }: HomeSectionProps) {
  const activeLinks = socialLinks?.filter(link => link.url && link.url.trim() !== '') || [];
  
  // Dynamic typing animation state
  const roles = [
    'Python Full Stack Developer',
    'Django Web Architect',
    'React & Frontend Specialist',
    'SQL Relational Designer',
    'Machine Learning & OpenCV'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullWord = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setRoleText(fullWord.slice(0, roleText.length + 1));
        if (roleText === fullWord) {
          setTypingSpeed(1800); // Wait on complete word
          setIsDeleting(true);
        } else {
          setTypingSpeed(75); // Writing speed
        }
      } else {
        setRoleText(fullWord.slice(0, roleText.length - 1));
        if (roleText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400); // Pause before next word
        } else {
          setTypingSpeed(35); // Deleting speed
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Dynamic background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-3xl" />
        {/* Tech dots pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tagline pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/15 mb-6 shadow-sm"
          >
            <Sparkles className="w-3 h-3" />
            <span>{profile?.available === false ? 'Busy / Fully Booked' : (profile?.availableText || 'Available for collaboration')}</span>
          </motion.div>

          {/* Core Name Title in Editorial style */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-light text-6xl sm:text-7xl md:text-8xl text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-6"
          >
            {profile?.name ? (
              <>
                {profile.name.split(' ')[0]}<br/>
                <span className="font-black italic text-violet-500 dark:text-violet-400">
                  {profile.name.split(' ').slice(1).join(' ')}.
                </span>
              </>
            ) : (
              <>
                KARAN<br/>
                <span className="font-black italic text-violet-500 dark:text-violet-400">DESALE.</span>
              </>
            )}
          </motion.h1>

          {/* Animated role subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-1.5 h-8 mb-6 font-mono text-base sm:text-lg md:text-xl font-bold text-violet-600 dark:text-violet-400"
          >
            <span className="select-none text-slate-400 font-medium mr-1">&gt;</span>
            <span>{roleText}</span>
            <span className="w-1.5 h-5 bg-violet-600 dark:bg-violet-400 animate-pulse" />
          </motion.div>

          {/* Editorial info metadata grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2 mb-6"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Currently</span>
              <span className="text-sm font-medium">{profile?.title || 'Python Full Stack Developer'}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Location</span>
              <span className="text-sm font-medium">{profile?.location || 'Mumbai, India'}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Role</span>
              <span className="text-sm font-medium text-violet-500 dark:text-violet-400">{profile?.role || 'Python • Django • React • SQL'}</span>
            </div>
          </motion.div>

          {/* Subtitle Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed font-sans"
          >
            {profile?.bio || 'Passionate Python Full Stack Developer focused on building scalable web applications using Django, React, REST APIs, SQL, and modern web technologies. I enjoy solving real-world problems through clean architecture and responsive user experiences.'}
          </motion.p>

          {/* Call-to-Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <button
              onClick={onContactClick}
              className="px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none"
              id="cta-contact"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onResumeClick}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white font-medium text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none"
              id="cta-resume"
              title={`Download resume: ${resumeFileName}`}
            >
              <FileText className="w-4 h-4 text-violet-500" />
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* Social Badges */}
          {activeLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <span className="font-sans text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Connect:</span>
              {activeLinks.map((link) => {
                const IconComponent = getSocialIcon(link.platform);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 hover:scale-110 transition-all shadow-sm"
                    aria-label={`${link.platform} Profile`}
                    id={`social-${link.platform.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Hero Right Visual Column - Glassmorphism Bento Display */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-[400px] aspect-square"
          >
            {/* Visual glow backdrop orb */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-600 blur-3xl opacity-30 dark:opacity-45 animate-pulse" />

            {/* Floating Card 1: Core Profile */}
            <div className="absolute inset-0 rounded-3xl glass-card dark:glass-card-dark p-6 flex flex-col justify-between border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden">
              {/* Background accent lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-violet-500/10 to-transparent rounded-full blur-xl" />
              
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="font-mono text-[9px] text-slate-450 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">v4.5.0</div>
              </div>

              <div className="my-auto flex flex-col items-center text-center py-4">
                <div className="relative mb-4">
                  {/* High quality double glow ring with slow spin & soft pulse */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-500 to-fuchsia-500 blur opacity-75 animate-pulse" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-90" />
                  
                  {/* Styled circular avatar element */}
                  <div className="relative w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-white dark:border-slate-950 flex items-center justify-center shadow-xl overflow-hidden">
                    <img 
                      src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'} 
                      alt={profile?.name || 'Karan Desale'}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white leading-tight">
                  {profile?.name || 'Karan Desale'}
                </h3>
                
                <p className="font-sans text-xs text-violet-600 dark:text-violet-400 font-semibold mt-1">
                  {profile?.title || 'Python Full Stack Developer'}
                </p>
                
                <div className="flex items-center gap-1.5 mt-3.5 px-3.5 py-1 bg-emerald-500/10 dark:bg-emerald-400/5 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/15 text-[10px] font-mono uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Available for Hire</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/40 flex justify-between items-center font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 max-w-[65%] truncate">
                  <Code2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span className="truncate">{profile?.role || 'Python • Django • React • SQL'}</span>
                </div>
                <span className="shrink-0">{profile?.location || 'Mumbai, India'}</span>
              </div>
            </div>

            {/* Orbiting Badge 1: Open to work (Top-Left) */}
            <motion.div
              animate={{ y: [0, -4, 0], x: [0, 3, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-8 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/50 shadow-lg flex items-center gap-2 z-20 cursor-default select-none"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 relative flex items-center justify-center">
                <div className="absolute w-4 h-4 rounded-full bg-emerald-500/30 animate-ping" />
              </div>
              <span className="font-display font-bold text-[10px] text-slate-800 dark:text-white uppercase tracking-wider">Open to Work</span>
            </motion.div>

            {/* Orbiting Badge 2: REST APIs (Top-Right) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-6 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/50 shadow-lg flex items-center gap-2.5 z-20 cursor-default select-none"
            >
              <div className="p-1 rounded bg-violet-500/15 text-violet-500">
                <Code2 className="w-3 h-3" />
              </div>
              <span className="font-display font-bold text-[10px] text-slate-800 dark:text-white uppercase tracking-wider">REST APIs</span>
            </motion.div>

            {/* Orbiting Badge 3: 3+ Projects (Bottom-Left) */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-6 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/50 shadow-lg flex items-center gap-2.5 z-20 cursor-default select-none"
            >
              <div className="p-1 rounded bg-indigo-500/15 text-indigo-500">
                <FolderKanban className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-slate-400 dark:text-slate-500 leading-none">PORTFOLIO</span>
                <span className="font-display font-black text-[10px] text-slate-850 dark:text-white leading-none mt-1">3+ Full Stack Projects</span>
              </div>
            </motion.div>

            {/* Orbiting Badge 4: AI Projects (Bottom-Right) */}
            <motion.div
              animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 -right-8 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/50 shadow-lg flex items-center gap-2.5 z-20 cursor-default select-none"
            >
              <div className="p-1 rounded bg-fuchsia-500/15 text-fuchsia-500">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-slate-400 dark:text-slate-500 leading-none">SPECIALTY</span>
                <span className="font-display font-black text-[10px] text-slate-850 dark:text-white leading-none mt-1">AI Projects</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
