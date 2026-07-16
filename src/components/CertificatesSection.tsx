import { Award, ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Certificate } from '../types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates = [] }: CertificatesSectionProps) {
  const safeCertificates = certificates || [];

  return (
    <section id="certificates" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            04 / Credentials
          </span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-slate-900 dark:text-white mt-2 tracking-tighter">
            Credentials & <span className="font-bold italic text-violet-500">Achievements</span>
          </h2>
          <div className="w-16 h-[1px] bg-violet-500 mt-4" />
        </div>

        {/* Certificates Grid */}
        {safeCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group rounded-3xl bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 shadow-sm flex flex-col justify-between overflow-hidden hover:border-violet-500/30 dark:hover:border-violet-400/20 hover:shadow-lg hover:scale-[1.01] transition-all text-left"
                id={`cert-card-${cert.id}`}
              >
                {/* Visual Header / Image representation of certificate */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Glowing layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Superimposed Icon badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-500/30">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] font-bold text-violet-400 tracking-wider leading-none uppercase">VERIFIED CREDENTIAL</span>
                      <span className="font-display font-bold text-xs text-white mt-0.5">{cert.issuer}</span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Date */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                        {cert.title}
                      </h3>
                      <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md shrink-0">
                        {cert.date}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                      {cert.description}
                    </p>
                  </div>

                  {/* Verification action link */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Authentic record</span>
                    </div>

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 hover:underline cursor-pointer"
                        id={`cert-link-${cert.id}`}
                      >
                        <span>Verify link</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <ShieldAlert className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-sans text-sm">No dynamic certifications found in database.</p>
          </div>
        )}
      </div>
    </section>
  );
}
