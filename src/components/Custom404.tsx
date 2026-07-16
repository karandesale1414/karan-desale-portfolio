import { Terminal, ShieldAlert, ArrowLeft } from 'lucide-react';

interface Custom404Props {
  onBackHome: () => void;
}

export default function Custom404({ onBackHome }: Custom404Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md text-center">
        {/* Animated icon */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-2xl backdrop-blur-xl mb-6 relative">
          <Terminal className="w-12 h-12 text-violet-400" />
          <div className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-500 shadow-md">
            <ShieldAlert className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* 404 Error code */}
        <h1 className="font-display font-extrabold text-7xl tracking-tighter bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="font-display font-bold text-xl sm:text-2xl mt-4 leading-tight">
          Resource Not Found
        </h2>

        <p className="font-sans text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
          The request requested resource is outside the active server routing schemas. Check the URL parameters.
        </p>

        {/* Debug block */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-left text-xs text-rose-400 w-full">
          <span className="text-slate-500 font-bold uppercase">&gt; system_response:</span>
          <p className="mt-1">• STATUS: ROUTING_ERROR (404)</p>
          <p>• ERR_MESSAGE: Target segment path invalid</p>
        </div>

        {/* Back Home CTA */}
        <button
          onClick={onBackHome}
          className="mt-8 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none"
          id="back-home-404-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>
      </div>
    </div>
  );
}
