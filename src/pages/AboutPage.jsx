import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import TiltCard from '../components/TiltCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import aboutData from '../data/about.json';
import team from '../data/team.json';
import statistics from '../data/statistics.json';

const VALUE_ICONS = [ShieldCheck, Eye, Lightbulb, Heart];

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

export default function AboutPage() {
  const { lang, t } = useLang();
  const a = aboutData[lang];

  return (
    <div className="pt-40 pb-20">
      {/* Hero */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-gradient text-xs font-semibold text-electric-500 dark:text-cyan-300 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {a.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-navy-900 dark:text-white mb-6"
          >
            {a.title1}<br />
            <span className="text-gradient">{a.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {a.intro}
          </motion.p>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl glass border-gradient p-8"
          >
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">{a.storyTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{a.story}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-electric-500/10 to-cyan-400/10 border border-electric-500/20 p-8"
          >
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">{a.missionTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{a.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white text-center mb-14"
          >
            {a.valuesTitle}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard className="h-full text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-electric-500 dark:text-cyan-300" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{value.desc}</p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 mb-24">
        <div className="max-w-5xl mx-auto rounded-3xl glass border-gradient p-10 md:p-14">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white text-center mb-10">{a.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat) => (
              <StatItem key={stat.key} stat={stat} label={t.hero.stats[stat.key]} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4"
          >
            {a.teamTitle}
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400">{a.teamSubtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="text-center" intensity={8}>
                <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{member.role[lang]}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-electric-500 to-cyan-500 p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{a.ctaTitle}</h2>
          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white text-electric-600 hover:shadow-xl transition-shadow"
            >
              {a.ctaBtn}
              <ArrowRight size={17} />
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </div>
  );
}