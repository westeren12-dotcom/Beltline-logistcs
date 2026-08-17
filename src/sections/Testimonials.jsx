import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import testimonials from '../data/testimonials.json';

const SECTION_TEXT = {
  uz: { title: 'Mijozlarimiz Fikri', subtitle: 'Bizga ishonch bildirgan hamkorlarimiz' },
  ru: { title: 'Отзывы Клиентов', subtitle: 'Партнёры, которые нам доверяют' },
  en: { title: 'What Clients Say', subtitle: 'Partners who trust us' },
};

export default function Testimonials() {
  const { lang } = useLang();
  const text = SECTION_TEXT[lang];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{text.subtitle}</p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div className="rounded-3xl glass border-gradient p-10 md:p-14 relative overflow-hidden min-h-[280px] flex items-center">
          <Quote size={80} className="absolute top-6 right-8 text-electric-500/10 dark:text-cyan-300/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-navy-900 dark:text-white leading-relaxed mb-8">
                "{current.review[lang]}"
              </p>

              <div className="w-14 h-14 rounded-full mx-auto mb-3 bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                {current.name.charAt(0)}
              </div>
              <div className="font-semibold text-navy-900 dark:text-white">{current.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {current.position[lang]}, {current.company}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass border-gradient flex items-center justify-center text-navy-900 dark:text-white hover:scale-105 transition-transform"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((tItem, i) => (
              <button
                key={tItem.id}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-gradient-to-r from-electric-500 to-cyan-400' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass border-gradient flex items-center justify-center text-navy-900 dark:text-white hover:scale-105 transition-transform"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}