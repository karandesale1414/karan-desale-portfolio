import { Briefcase, GraduationCap, Star, Milestone } from 'lucide-react';
import { TimelineItem } from '../types';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline = [] }: TimelineSectionProps) {
  const safeTimeline = timeline || [];
  // Sorting: Present items first, or standard hardcoded order from our store (which is correct chronological)
  
  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-5 h-5 text-violet-500" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-fuchsia-500" />;
      default:
        return <Star className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getBorderColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return 'border-violet-500/30';
      case 'education':
        return 'border-fuchsia-500/30';
      default:
        return 'border-indigo-500/30';
    }
  };

  return (
    <section id="timeline" className="py-20 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            05 / Chronology
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            Career Timeline & <span className="font-bold italic text-violet-500">Education</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Timeline Path Structure */}
        {safeTimeline.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            {/* Center connector line (Desktop-only center, Mobile-left aligned) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

            <div className="space-y-12">
              {safeTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                    id={`timeline-row-${item.id}`}
                  >
                    {/* Glowing Circular Marker Icon */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-md border-2 border-slate-200 dark:border-slate-800 hover:scale-110 transition-transform">
                        {getIcon(item.type)}
                        {/* Glow effect */}
                        <div className="absolute -inset-1 rounded-full bg-violet-500/10 blur-sm -z-10" />
                      </div>
                    </div>

                    {/* Left Space Spacer for symmetrical balance */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Timeline Content Block */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                      <div
                        className={`p-6 rounded-3xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 hover:shadow-md transition-all ${getBorderColor(
                          item.type
                        )}`}
                      >
                        {/* Title, Badge and Duration */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                          <div>
                            <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                              {item.company}
                            </span>
                            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">
                              {item.role}
                            </h3>
                          </div>
                          
                          <span className="inline-block px-3 py-1 font-mono text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-500/5 rounded-full border border-violet-500/10 shrink-0 self-start sm:self-center">
                            {item.duration}
                          </span>
                        </div>

                        {/* Bullet description statements */}
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans list-disc pl-4 marker:text-violet-500">
                          {item.description.map((desc, dIdx) => (
                            <li key={dIdx} className="leading-relaxed">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <Milestone className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-sans text-sm">No career milestone logs found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
