import { motion } from 'framer-motion';
import { Clock, Truck, DollarSign } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';
import routesData from '../data/routes.json';

const SECTION_TEXT = {
  uz: { title: 'Xalqaro Yo\'nalishlar', subtitle: 'Dunyoning istalgan nuqtasiga ishonchli yetkazib berish', time: 'Muddat', transport: 'Transport', cost: 'Narx' },
  ru: { title: 'Международные Маршруты', subtitle: 'Надёжная доставка в любую точку мира', time: 'Срок', transport: 'Транспорт', cost: 'Цена' },
  en: { title: 'International Routes', subtitle: 'Reliable delivery to every corner of the world', time: 'Time', transport: 'Transport', cost: 'Cost' },
};

export default function RoutesSection() {
  const { lang } = useLang();
  const text = SECTION_TEXT[lang];

  return (
    <section id="routes" className="relative py-24 px-6">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {routesData.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <TiltCard className="text-center" intensity={8}>
                <div className="text-4xl mb-3">{route.flag}</div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-4">
                  {route.country[lang]}
                </h3>
                <div className="space-y-2.5 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Clock size={12} />{text.time}
                    </span>
                    <span className="font-medium text-navy-900 dark:text-white">{route.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Truck size={12} />{text.transport}
                    </span>
                    <span className="font-medium text-navy-900 dark:text-white">{route.transport}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <DollarSign size={12} />{text.cost}
                    </span>
                    <span className="font-semibold text-gradient">{route.cost}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}