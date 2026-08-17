import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Warehouse, Truck, ShieldCheck, Home, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';

const STAGES = [
  { key: 'warehouse', icon: Warehouse },
  { key: 'transit', icon: Truck },
  { key: 'customs', icon: ShieldCheck },
  { key: 'outForDelivery', icon: Home },
  { key: 'delivered', icon: CheckCircle2 },
];

const STAGE_LABELS = {
  uz: ['Ombor', 'Yo\'lda', 'Bojxona', 'Yetkazishda', 'Yetkazildi'],
  ru: ['Склад', 'В пути', 'Таможня', 'Доставка', 'Доставлено'],
  en: ['Warehouse', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered'],
};

export default function TrackingWidget() {
  const { t, lang } = useLang();
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [activeStage] = useState(2); // demo: bojxonada

  const handleSearch = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setResult({
      code: code.toUpperCase(),
      status: STAGE_LABELS[lang][activeStage],
    });
  };

  const labels = STAGE_LABELS[lang];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white"
        >
          {t.live.title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto rounded-3xl glass border-gradient p-8"
      >
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="BLX-284719"
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/5 dark:bg-white/5 border border-white/10
                         focus:border-electric-500 focus:outline-none text-navy-900 dark:text-white placeholder:text-slate-400 transition-colors"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white
                       bg-gradient-to-r from-electric-500 to-cyan-500 shadow-lg shadow-electric-500/30"
          >
            <Search size={17} />
          </motion.button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t.live.tracking}: <span className="font-semibold text-navy-900 dark:text-white">{result.code}</span>
                  </span>
                  <span className="text-sm font-semibold text-cyan-400">{result.status}</span>
                </div>

                <div className="relative flex justify-between">
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10" />
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-electric-500 to-cyan-400"
                  />

                  {STAGES.map((stage, i) => {
                    const Icon = stage.icon;
                    const isActive = i <= activeStage;
                    return (
                      <div key={stage.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.15, type: 'spring' }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                            isActive
                              ? 'bg-gradient-to-br from-electric-500 to-cyan-400 border-transparent text-white'
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          <Icon size={16} />
                        </motion.div>
                        <span className={`text-[11px] text-center max-w-[70px] ${isActive ? 'text-navy-900 dark:text-white font-medium' : 'text-slate-400'}`}>
                          {labels[i]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}