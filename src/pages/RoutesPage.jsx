import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Truck, DollarSign, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import routes from '../data/routes.json';

const PAGE_TEXT = {
  uz: {
    badge: 'Yo\'nalishlarimiz',
    title1: 'Dunyo Bo\'ylab',
    title2: 'Ishonchli Yo\'nalishlar',
    subtitle: 'Eng ko\'p talab qilinadigan yo\'nalishlarimiz bo\'yicha tezkor va xavfsiz yetkazib berish.',
    timeLabel: 'Muddat',
    transportLabel: 'Transport',
    costLabel: 'Narx',
    ctaTitle: 'O\'zingizga kerakli yo\'nalishni topolmadingizmi?',
    ctaBtn: 'Biz bilan bog\'laning',
  },
  ru: {
    badge: 'Наши Направления',
    title1: 'Надёжные Маршруты',
    title2: 'По Всему Миру',
    subtitle: 'Быстрая и безопасная доставка по самым востребованным направлениям.',
    timeLabel: 'Срок',
    transportLabel: 'Транспорт',
    costLabel: 'Цена',
    ctaTitle: 'Не нашли нужное направление?',
    ctaBtn: 'Свяжитесь с нами',
  },
  en: {
    badge: 'Our Routes',
    title1: 'Reliable Routes',
    title2: 'Around The World',
    subtitle: 'Fast and secure delivery across our most in-demand destinations.',
    timeLabel: 'Duration',
    transportLabel: 'Transport',
    costLabel: 'Price',
    ctaTitle: 'Can\'t find the route you need?',
    ctaBtn: 'Get in Touch',
  },
};

export default function RoutesPage() {
  const { lang } = useLang();
  const text = PAGE_TEXT[lang];

  return (
    <div className="pt-40 pb-20">
      {/* Header */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-gradient text-xs font-semibold text-electric-500 dark:text-cyan-300 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {text.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-[1.1] text-navy-900 dark:text-white mb-6"
          >
            {text.title1}<br />
            <span className="text-gradient">{text.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            {text.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Routes grid */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <TiltCard className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric-500/20 to-cyan-400/20 flex items-center justify-center text-2xl">
                    {route.flag}
                  </div>
                  <h3 className="text-base font-bold text-navy-900 dark:text-white">
                    {route.country[lang]}
                  </h3>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock size={14} className="text-electric-500 dark:text-cyan-300 flex-shrink-0" />
                    <span className="text-slate-400">{text.timeLabel}:</span>
                    <span className="font-medium text-navy-900 dark:text-white">{route.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Truck size={14} className="text-electric-500 dark:text-cyan-300 flex-shrink-0" />
                    <span className="text-slate-400">{text.transportLabel}:</span>
                    <span className="font-medium text-navy-900 dark:text-white">{route.transport}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <DollarSign size={14} className="text-electric-500 dark:text-cyan-300 flex-shrink-0" />
                    <span className="text-slate-400">{text.costLabel}:</span>
                    <span className="font-medium text-navy-900 dark:text-white">{route.cost}</span>
                  </div>
                </div>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{text.ctaTitle}</h2>
          <MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white text-electric-600 hover:shadow-xl transition-shadow"
            >
              {text.ctaBtn}
              <ArrowRight size={17} />
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </div>
  );
}