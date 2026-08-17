import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Truck, Container, Warehouse as WarehouseIcon, Plane, Ship, TruckIcon } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';

const FLEET_ITEMS = [
  { icon: Truck, key: 'truck' },
  { icon: Container, key: 'trailer' },
  { icon: WarehouseIcon, key: 'warehouse' },
  { icon: Container, key: 'container' },
  { icon: Plane, key: 'plane' },
  { icon: Ship, key: 'ship' },
];

const LABELS = {
  uz: { title: 'Bizning Transport Parkimiz', subtitle: 'Zamonaviy va ishonchli texnika bazasi', truck: 'Yuk mashinasi', trailer: 'Treyler', warehouse: 'Ombor', container: 'Konteyner', plane: 'Yuk samolyoti', ship: 'Yuk kemasi' },
  ru: { title: 'Наш Автопарк', subtitle: 'Современная и надёжная техническая база', truck: 'Грузовик', trailer: 'Трейлер', warehouse: 'Склад', container: 'Контейнер', plane: 'Грузовой самолёт', ship: 'Грузовое судно' },
  en: { title: 'Our Fleet', subtitle: 'Modern and reliable equipment base', truck: 'Truck', trailer: 'Trailer', warehouse: 'Warehouse', container: 'Container', plane: 'Cargo Plane', ship: 'Cargo Ship' },
};

export default function Fleet() {
  const { lang } = useLang();
  const t = LABELS[lang];
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FLEET_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.key}
                onClick={() => setSelected(item)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl glass border-gradient h-56 flex flex-col items-center justify-center gap-4 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-cyan-400/0 group-hover:from-electric-500/10 group-hover:to-cyan-400/10 transition-all duration-500" />
                <Icon size={48} className="text-electric-500 dark:text-cyan-300 relative z-10" />
                <span className="text-sm font-semibold text-navy-900 dark:text-white relative z-10">{t[item.key]}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[90] bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl glass border-gradient p-16 flex flex-col items-center gap-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>
              <selected.icon size={100} className="text-cyan-300" />
              <span className="text-xl font-bold text-white">{t[selected.key]}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}