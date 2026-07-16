import { motion } from 'motion/react';
import { Award, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import { Project, Certificate, BlogPost } from '../types';

interface AboutSectionProps {
  projects: Project[];
  certificates: Certificate[];
  blogs: BlogPost[];
}

export default function AboutSection({ projects = [], certificates = [], blogs = [] }: AboutSectionProps) {
  // Compute metric stats
  const totalProjects = (projects || []).length;
  const totalCertificates = (certificates || []).length;
  const totalBlogs = (blogs || []).length;
  const yearsExperience = 3; // Static realistic value

  const stats = [
    { value: `${yearsExperience}+`, label: 'Years Experience' },
    { value: totalProjects, label: 'Projects Completed' },
    { value: totalCertificates, label: 'Certifications' },
    { value: totalBlogs, label: 'Tech Articles' }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            01 / About Me
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            The Journey of a <span className="font-bold italic text-violet-500">Full Stack Developer</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white">
              Hi, I am Karan Desale. I build robust web architectures from scratch.
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans">
              Passionate Python Full Stack Developer focused on building scalable web applications using Django, React, REST APIs, SQL, and modern web technologies. I enjoy solving real-world problems through clean architecture and responsive user experiences.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans">
              I specialize in combining the power of Django for fast, secure REST APIs with React for high-fidelity, interactive, and fluid frontend client states. I have comprehensive knowledge of database design, complex SQL optimization, and cloud operations.
            </p>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 flex flex-col items-start gap-2 shadow-sm">
                <Briefcase className="w-5 h-5 text-violet-500" />
                <span className="font-display font-semibold text-sm text-slate-800 dark:text-white">Work History</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Django • React • SQL</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 flex flex-col items-start gap-2 shadow-sm">
                <GraduationCap className="w-5 h-5 text-fuchsia-500" />
                <span className="font-display font-semibold text-sm text-slate-800 dark:text-white">Education</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Bachelor of Engineering</span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 flex flex-col items-start gap-2 shadow-sm">
                <Award className="w-5 h-5 text-indigo-500" />
                <span className="font-display font-semibold text-sm text-slate-800 dark:text-white">Credentials</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Python Full Stack Dev</span>
              </div>
            </div>
          </div>

          {/* Stats & Image Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visual Container */}
            <div className="relative rounded-3xl p-6 bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-xl overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-600/10 to-transparent blur-2xl" />
              
              <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span>Fast Metrics</span>
                <ChevronRight className="w-4 h-4 text-violet-500" />
              </h4>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300"
                  >
                    <span className="font-display font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Extra visual bio detail */}
              <div className="mt-6 p-4 rounded-2xl bg-violet-500/5 dark:bg-violet-400/5 border border-violet-500/10 text-xs font-mono text-slate-500 dark:text-slate-400 flex flex-col gap-1">
                <span className="text-violet-600 dark:text-violet-400 font-bold">&gt; system_details</span>
                <span>• STATUS: Open to Work</span>
                <span>• LOCATION: Mumbai, Maharashtra, India</span>
                <span>• PRIMARY_IDE: VS Code / PyCharm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
