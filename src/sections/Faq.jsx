import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import faqData from '../data/faq.json';

const SECTION_TEXT = {
  uz: { title: 'Ko\'p Beriladigan Savollar', subtitle: 'Sizni qiziqtirgan javoblarni shu yerdan toping' },
  ru: { title: 'Часто Задаваемые Вопросы', subtitle: 'Найдите ответы на интересующие вас вопросы' },
  en: { title: 'Frequently Asked Questions', subtitle: 'Find answers to what matters to you' },
};

export default function Faq() {
  const { lang } = useLang();
  const text = SECTION_TEXT[lang];
  const [openId, setOpenId] = useState(null);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{text.subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {faqData.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl glass border-gradient overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-navy-900 dark:text-white pr-4">
                    {item.question[lang]}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-electric-500/10 flex items-center justify-center text-electric-500 dark:text-cyan-300"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.answer[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}