import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white font-sans"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing rings */}
        <div className="absolute -inset-10 bg-radial from-violet-600/20 via-transparent to-transparent blur-2xl" />
        
        {/* Main animated terminal icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mb-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-2xl backdrop-blur-xl"
        >
          <Terminal className="w-12 h-12 text-violet-400" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50"
          />
        </motion.div>

        {/* Brand / Developer name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent"
        >
          Karan Desale
        </motion.h1>

        {/* Dynamic code typist subheader */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-2 font-mono text-xs text-slate-400"
        >
          system_compile_portfolio_core --active
        </motion.p>

        {/* Progress Bar Container */}
        <div className="mt-8 w-48 h-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500"
          />
        </div>

        {/* Progress Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
          className="mt-2 font-mono text-[10px] text-slate-500 flex justify-between w-48"
        >
          <span>BUILD: OK</span>
          <span>100%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
