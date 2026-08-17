import { motion } from 'framer-motion';
import { ClipboardList, PackageCheck, Truck, Home } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';

const STEPS_DATA = {
  uz: [
    { icon: ClipboardList, title: 'So\'rov', desc: 'Yukingiz haqida ma\'lumot bering, biz taklif tayyorlaymiz.' },
    { icon: PackageCheck, title: 'Olib ketish', desc: 'Belgilangan manzildan yukni xavfsiz olib ketamiz.' },
    { icon: Truck, title: 'Tashish', desc: 'Yukingiz jonli kuzatuv bilan manzilga yo\'l oladi.' },
    { icon: Home, title: 'Yetkazish', desc: 'Yuk belgilangan manzilga o\'z vaqtida yetkaziladi.' },
  ],
  ru: [
    { icon: ClipboardList, title: 'Заявка', desc: 'Расскажите о грузе, мы подготовим предложение.' },
    { icon: PackageCheck, title: 'Забор груза', desc: 'Безопасно забираем груз с указанного адреса.' },
    { icon: Truck, title: 'Перевозка', desc: 'Груз отправляется с живым отслеживанием.' },
    { icon: Home, title: 'Доставка', desc: 'Груз доставляется точно в срок.' },
  ],
  en: [
    { icon: ClipboardList, title: 'Request', desc: 'Tell us about your cargo, we prepare a quote.' },
    { icon: PackageCheck, title: 'Pickup', desc: 'We safely collect the cargo from the given address.' },
    { icon: Truck, title: 'Transportation', desc: 'Your shipment travels with live tracking.' },
    { icon: Home, title: 'Delivery', desc: 'Cargo is delivered right on schedule.' },
  ],
};

const SECTION_TEXT = {
  uz: { title: 'Ishlash Jarayoni', subtitle: 'To\'rt oddiy bosqichda yukingiz manzilga yetadi' },
  ru: { title: 'Процесс Работы', subtitle: 'Ваш груз достигнет цели за четыре простых шага' },
  en: { title: 'How It Works', subtitle: 'Your cargo reaches its destination in four simple steps' },
};

export default function Process() {
  const { lang } = useLang();
  const steps = STEPS_DATA[lang];
  const text = SECTION_TEXT[lang];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            {text.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{text.subtitle}</p>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* connecting line - desktop only */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-white/10" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-electric-500 to-cyan-400"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl glass border-gradient flex items-center justify-center mb-5 bg-white dark:bg-navy-900">
                  <Icon size={28} className="text-electric-500 dark:text-cyan-300" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-electric-500 to-cyan-400 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-[220px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}   