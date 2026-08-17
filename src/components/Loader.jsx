import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-navy-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-electric-500/30"
            >
              <Truck size={28} className="text-white" />
            </motion.div>
            <span className="text-sm font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Beltline Logistics
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}