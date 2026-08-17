import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, User, Package, Truck } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import MagneticButton from '../components/MagneticButton.jsx';
import statistics from '../data/statistics.json';

function StatItem({ stat, label }) {
  const { count, ref } = useCountUp(stat.value, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-gradient text-xs font-semibold text-electric-500 dark:text-cyan-300 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-navy-900 dark:text-white"
          >
            {t.hero.title1}<br />
            <span className="text-gradient">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link
                to="/tracking"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white
                           bg-gradient-to-r from-electric-500 to-cyan-500 shadow-xl shadow-electric-500/30
                           hover:shadow-electric-500/50 transition-shadow"
              >
                <Search size={17} />
                {t.hero.trackBtn}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold
                           glass border-gradient text-navy-900 dark:text-white hover:bg-white/10 transition-colors"
              >
                {t.hero.quoteBtn}
                <ArrowRight size={17} />
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-14 grid grid-cols-4 gap-4 max-w-lg"
          >
            {statistics.map((stat) => (
              <StatItem key={stat.key} stat={stat} label={t.hero.stats[stat.key]} />
            ))}
          </motion.div>
        </div>

        {/* Right: floating truck + live tracking glass card */}
        <div className="relative h-[480px] hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-electric-500/30 to-cyan-400/20 blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-6 left-6 w-40 h-40 rounded-3xl glass border-gradient flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Truck size={56} className="text-electric-500 dark:text-cyan-300" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-0 right-0 w-[340px] rounded-3xl glass border-gradient p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-navy-900 dark:text-white">{t.live.title}</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.live.inTransit}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Package size={14} />
                <span>{t.live.tracking}: <span className="text-navy-900 dark:text-white font-medium">BLX-284719</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin size={14} />
                <span>{t.live.eta}: <span className="text-navy-900 dark:text-white font-medium">2 kun</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <User size={14} />
                <span>{t.live.driver}: <span className="text-navy-900 dark:text-white font-medium">A. Yusupov</span></span>
              </div>
            </div>

            <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full bg-gradient-to-r from-electric-500 to-cyan-400"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}