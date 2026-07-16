import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Layers, Code2, Palette, Sparkles, BarChart3, 
  Server, Cpu, Terminal, Database, Box, Cloud, 
  Workflow, Globe, Network, Brain, FolderOpen,
  FileCode2, Monitor, GitBranch, Github, Eye
} from 'lucide-react';
import { Skill, SkillCategory } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

// Icon mapper helper
export function getSkillIcon(name?: string) {
  switch (name) {
    case 'Layers': return <Layers className="w-4 h-4" />;
    case 'Code2': return <Code2 className="w-4 h-4" />;
    case 'Palette': return <Palette className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4" />;
    case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
    case 'Server': return <Server className="w-4 h-4" />;
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'Terminal': return <Terminal className="w-4 h-4" />;
    case 'Database': return <Database className="w-4 h-4" />;
    case 'Box': return <Box className="w-4 h-4" />;
    case 'Cloud': return <Cloud className="w-4 h-4" />;
    case 'Workflow': return <Workflow className="w-4 h-4" />;
    case 'Globe': return <Globe className="w-4 h-4" />;
    case 'Network': return <Network className="w-4 h-4" />;
    case 'Brain': return <Brain className="w-4 h-4" />;
    case 'FolderOpen': return <FolderOpen className="w-4 h-4" />;
    case 'FileCode2': return <FileCode2 className="w-4 h-4" />;
    case 'Monitor': return <Monitor className="w-4 h-4" />;
    case 'GitBranch': return <GitBranch className="w-4 h-4" />;
    case 'Github': return <Github className="w-4 h-4" />;
    case 'Eye': return <Eye className="w-4 h-4" />;
    default: return <Terminal className="w-4 h-4" />;
  }
}

const CATEGORIES: (SkillCategory | 'All')[] = ['All', 'Frontend', 'Backend', 'DevOps', 'Data & ML', 'Other'];

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const safeSkills = skills || [];

  // Filter skills based on search query and category
  const filteredSkills = useMemo(() => {
    return safeSkills.filter((skill) => {
      if (!skill) return false;
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = (skill.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [safeSkills, selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            02 / Expertise
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            Capabilities & <span className="font-bold italic text-violet-500">Technologies</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Toolbar: Search and Filter Categories */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/30">
          
          {/* Categories Horizontal Selector */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                id={`skill-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm font-sans text-slate-800 dark:text-white shadow-sm"
              id="skill-search-input"
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-sm flex flex-col justify-between hover:border-violet-500/30 dark:hover:border-violet-400/20 hover:shadow-md transition-all group"
                id={`skill-card-${skill.id}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-500/5 group-hover:scale-110 transition-transform duration-300">
                        {getSkillIcon(skill.iconName)}
                      </div>
                      <span className="font-display font-semibold text-sm sm:text-base text-slate-800 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <span className="inline-block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md mb-4 border border-slate-200/20">
                    {skill.category}
                  </span>
                </div>

                {/* Proficiency Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800/70 rounded-full overflow-hidden border border-slate-200/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 dark:from-violet-400 dark:to-indigo-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-sans text-sm">No skills found matching your parameters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
