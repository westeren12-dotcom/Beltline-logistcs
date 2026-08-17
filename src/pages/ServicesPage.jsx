import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Plane, Train, Ship, Warehouse, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import services from '../data/services.json';

const ICONS = { Truck, Plane, Train, Ship, Warehouse, ShieldCheck };

const PAGE_TEXT = {
  uz: {
    badge: 'Xizmatlarimiz',
    title1: 'Har Qanday Yuk Uchun',
    title2: 'To\'liq Yechim',
    subtitle: 'Kichik jo\'natmalardan tortib yirik xalqaro yuklargacha — biz har bir bosqichda yoningizdamiz.',
    ctaTitle: 'Loyihangiz uchun individual taklif kerakmi?',
    ctaBtn: 'Narx so\'rash',
  },
  ru: {
    badge: 'Наши Услуги',
    title1: 'Полное Решение',
    title2: 'Для Любого Груза',
    subtitle: 'От небольших отправлений до крупных международных грузов — мы рядом на каждом этапе.',
    ctaTitle: 'Нужно индивидуальное предложение для вашего проекта?',
    ctaBtn: 'Запросить цену',
  },
  en: {
    badge: 'Our Services',
    title1: 'A Complete Solution',
    title2: 'For Every Cargo',
    subtitle: 'From small parcels to large international shipments — we\'re with you at every step.',
    ctaTitle: 'Need a custom quote for your project?',
    ctaBtn: 'Request a Quote',
  },
};

export default function ServicesPage() {
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

      {/* Services grid - detailed */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto space-y-6">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard intensity={5} className="!p-0 overflow-hidden">
                  <div className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-stretch`}>
                    <div className="md:w-2/5 flex items-center justify-center p-10 bg-gradient-to-br from-electric-500/10 to-cyan-400/10">
                      <Icon size={80} className="text-electric-500 dark:text-cyan-300" strokeWidth={1.2} />
                    </div>
                    <div className="md:w-3/5 p-8">
                      <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-3">
                        {service.title[lang]}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                        {service.desc[lang]}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {service.features[lang].map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <Check size={14} className="text-emerald-400 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
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