import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, X, BookOpen, Compass, ChevronRight, Tag } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs = [] }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const safeBlogs = blogs || [];

  // Extract unique categories
  const categories = useMemo(() => {
    const catsSet = new Set<string>();
    safeBlogs.forEach((b) => {
      if (b && b.category) {
        catsSet.add(b.category);
      }
    });
    return ['All', ...Array.from(catsSet)];
  }, [safeBlogs]);

  // Filter posts
  const filteredBlogs = useMemo(() => {
    return safeBlogs.filter((blog) => {
      if (!blog) return false;
      const matchesSearch = 
        (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [safeBlogs, searchQuery, selectedCategory]);

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            06 / Insights
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            The Developer <span className="font-bold italic text-violet-500">Blog</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Toolbar: Categories Selector & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/30">
          
          {/* Categories select list */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 overflow-x-auto max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                id={`blog-cat-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search inputs */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm font-sans text-slate-800 dark:text-white shadow-sm"
              id="blog-search-input"
            />
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => setActivePost(blog)}
                className="group rounded-3xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-sm flex flex-col justify-between overflow-hidden hover:border-violet-500/30 dark:hover:border-violet-400/20 hover:shadow-lg transition-all cursor-pointer text-left"
                id={`blog-card-${blog.id}`}
              >
                {/* Thumbnail panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[9px] font-bold font-mono tracking-wider bg-slate-900/80 text-white rounded-md uppercase">
                    {blog.category}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta details */}
                    <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.publishedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-slate-600 dark:text-slate-350 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Footer read action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-violet-600 dark:text-violet-400 font-display font-bold text-xs sm:text-sm">
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-sans text-sm">No blog posts found matching criteria.</p>
          </div>
        )}

        {/* Dynamic Reader Overlay Modal */}
        <AnimatePresence>
          {activePost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePost(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Reader Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-left"
                id={`blog-reader-modal-${activePost.id}`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors cursor-pointer focus:outline-none"
                  id="reader-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Title Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[10px] font-bold text-violet-400 bg-violet-950/50 px-2 py-1 rounded-md border border-violet-500/20 uppercase">
                      {activePost.category}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-3xl text-white mt-3 leading-snug">
                      {activePost.title}
                    </h3>
                  </div>
                </div>

                {/* Reading Space */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  {/* Date and tags bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-3 font-mono text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{activePost.publishedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{activePost.readTime}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {activePost.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/40 px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-200/20">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Formatted body paragraph renderer */}
                  <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                    {activePost.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h4 key={index} className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white pt-4">
                            {paragraph.replace('## ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h5 key={index} className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white pt-2">
                            {paragraph.replace('### ', '')}
                          </h5>
                        );
                      }
                      if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                        return (
                          <ul key={index} className="list-disc pl-5 space-y-1 my-2">
                            {paragraph.split('\n').map((li, liIdx) => (
                              <li key={liIdx}>{li.replace(/^[\*\-]\s+/, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ')) {
                        return (
                          <ol key={index} className="list-decimal pl-5 space-y-1 my-2">
                            {paragraph.split('\n').map((li, liIdx) => (
                              <li key={liIdx}>{li.replace(/^\d+\.\s+/, '')}</li>
                            ))}
                          </ol>
                        );
                      }
                      if (paragraph.startsWith('```')) {
                        const lines = paragraph.split('\n');
                        const code = lines.slice(1, -1).join('\n');
                        return (
                          <pre key={index} className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto my-4 border border-slate-800">
                            <code>{code}</code>
                          </pre>
                        );
                      }
                      return <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{paragraph}</p>;
                    })}
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
