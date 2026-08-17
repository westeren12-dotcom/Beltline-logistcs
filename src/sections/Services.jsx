import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Plane, Train, Ship, Warehouse, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';
import services from '../data/services.json';

const ICONS = { Truck, Plane, Train, Ship, Warehouse, ShieldCheck };

const SECTION_TEXT = {
  uz: { title: 'Bizning Xizmatlar', subtitle: 'Har qanday yuk turi uchun to\'liq logistika yechimlari', more: 'Batafsil' },
  ru: { title: 'Наши Услуги', subtitle: 'Полные логистические решения для любого типа груза', more: 'Подробнее' },
  en: { title: 'Our Services', subtitle: 'Complete logistics solutions for every cargo type', more: 'Learn More' },
};

export default function Services() {
  const { lang } = useLang();
  const text = SECTION_TEXT[lang];

  return (
    <section id="services" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{text.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <TiltCard className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500/20 to-cyan-400/20 flex items-center justify-center mb-5">
                    <Icon size={26} className="text-electric-500 dark:text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">
                    {service.desc[lang]}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.features[lang].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-500 dark:text-cyan-300 hover:gap-2.5 transition-all"
                  >
                    {text.more}
                    <ArrowRight size={14} />
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}