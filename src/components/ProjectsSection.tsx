import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, ExternalLink, X, Tag, Code, Compass } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | 'All'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const safeProjects = projects || [];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    safeProjects.forEach((proj) => {
      if (proj && proj.tags) {
        proj.tags.forEach((t) => tagsSet.add(t));
      }
    });
    return ['All', ...Array.from(tagsSet)];
  }, [safeProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return safeProjects.filter((proj) => {
      if (!proj) return false;
      const matchesSearch = 
        (proj.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (proj.technologies || []).some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === 'All' || (proj.tags || []).includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [safeProjects, searchQuery, selectedTag]);

  return (
    <section id="projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            03 / Showcase
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            Featured Projects & <span className="font-bold italic text-violet-500">Work</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Toolbar: Tag Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/30">
          
          {/* Tags Filter List */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 overflow-x-auto max-w-full no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${
                  selectedTag === tag
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                id={`project-tag-btn-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Project Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search projects or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm font-sans text-slate-800 dark:text-white shadow-sm"
              id="project-search-input"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-md flex flex-col justify-between overflow-hidden hover:border-violet-500/30 dark:hover:border-violet-400/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                onClick={() => setActiveProject(project)}
                id={`project-card-${project.id}`}
              >
                {/* Project Image Panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider bg-violet-600 text-white rounded-md flex items-center gap-1 shadow-md uppercase">
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Brief Info */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((t) => (
                        <span key={t} className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies Pills preview */}
                  <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="font-mono text-[10px] text-slate-400 bg-transparent px-1.5">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Compass className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-sans text-sm">No projects matching your search selection.</p>
          </div>
        )}

        {/* Modal Window Overlay */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-left"
                id={`project-details-modal-${activeProject.id}`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors cursor-pointer focus:outline-none shadow-md"
                  id="modal-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating info over banner */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {activeProject.tags.map((t) => (
                        <span key={t} className="font-mono text-[9px] font-extrabold tracking-widest bg-violet-600 text-white uppercase px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-3xl text-white">
                      {activeProject.title}
                    </h3>
                  </div>
                </div>

                {/* Description and metadata */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-violet-500" />
                      <span>About Project</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
                      {activeProject.longDescription || activeProject.description}
                    </p>
                  </div>

                  {/* Built Stack list */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-violet-500" />
                      <span>Core Technology Stack</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-500/5 border border-violet-500/10 px-3 py-1 rounded-xl"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                        id="modal-github-link"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                        id="modal-live-link"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch App</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
