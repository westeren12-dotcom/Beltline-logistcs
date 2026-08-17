import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext.jsx';
import TrackingWidget from '../sections/TrackingWidget.jsx';

const PAGE_TEXT = {
  uz: {
    badge: 'Kuzatuv Xizmati',
    title1: 'Yukingizni',
    title2: 'Real Vaqtda Kuzating',
    subtitle: 'Kuzatuv raqamingizni kiriting va jo\'natmangiz qayerda ekanini bir zumda bilib oling.',
  },
  ru: {
    badge: 'Сервис Отслеживания',
    title1: 'Отслеживайте Груз',
    title2: 'В Реальном Времени',
    subtitle: 'Введите номер отслеживания и мгновенно узнайте, где находится ваша отправка.',
  },
  en: {
    badge: 'Tracking Service',
    title1: 'Track Your Cargo',
    title2: 'In Real Time',
    subtitle: 'Enter your tracking number and instantly find out where your shipment is.',
  },
};

export default function TrackingPage() {
  const { lang } = useLang();
  const text = PAGE_TEXT[lang];

  return (
    <div className="pt-40 pb-10">
      <section className="px-6 mb-8">
        <div className="max-w-3xl mx-auto text-center">
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
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            {text.subtitle}
          </motion.p>
        </div>
      </section>

      <TrackingWidget />
    </div>
  );
}