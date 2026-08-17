import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Headset, Users } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';

const ITEMS = {
  uz: [
    { icon: Zap, title: 'Tezkor Yetkazish', desc: 'Yuklaringiz belgilangan muddatda, hech qanday kechikishsiz yetib boradi.', stat: '99%', statLabel: 'o\'z vaqtida' },
    { icon: ShieldCheck, title: 'Yuk Sug\'urtasi', desc: 'Har bir jo\'natma to\'liq sug\'urtalangan — xotirjamlik kafolati.', stat: '100%', statLabel: 'qamrov' },
    { icon: Headset, title: '24/7 Qo\'llab-quvvatlash', desc: 'Bizning jamoa har doim aloqada — istalgan vaqt, istalgan savol.', stat: '24/7', statLabel: 'onlayn' },
    { icon: Users, title: 'Professional Jamoa', desc: 'Tajribali logistika mutaxassislari sizning yukingiz uchun ishlaydi.', stat: '150+', statLabel: 'mutaxassis' },
  ],
  ru: [
    { icon: Zap, title: 'Быстрая доставка', desc: 'Ваши грузы прибывают в срок, без задержек.', stat: '99%', statLabel: 'вовремя' },
    { icon: ShieldCheck, title: 'Страхование груза', desc: 'Каждая отправка полностью застрахована — гарантия спокойствия.', stat: '100%', statLabel: 'покрытие' },
    { icon: Headset, title: 'Поддержка 24/7', desc: 'Наша команда всегда на связи — в любое время, по любому вопросу.', stat: '24/7', statLabel: 'онлайн' },
    { icon: Users, title: 'Профессиональная команда', desc: 'Опытные специалисты логистики работают для вашего груза.', stat: '150+', statLabel: 'специалистов' },
  ],
  en: [
    { icon: Zap, title: 'Fast Delivery', desc: 'Your cargo arrives on schedule, with zero delays.', stat: '99%', statLabel: 'on-time' },
    { icon: ShieldCheck, title: 'Cargo Insurance', desc: 'Every shipment is fully insured — total peace of mind.', stat: '100%', statLabel: 'coverage' },
    { icon: Headset, title: '24/7 Support', desc: 'Our team is always reachable — any time, any question.', stat: '24/7', statLabel: 'online' },
    { icon: Users, title: 'Professional Team', desc: 'Experienced logistics experts working for your cargo.', stat: '150+', statLabel: 'experts' },
  ],
};

const SECTION_TITLE = {
  uz: { title: 'Nega Aynan Biz?', subtitle: 'Mijozlarimiz bizga ishonadigan sabablar' },
  ru: { title: 'Почему Именно Мы?', subtitle: 'Причины, по которым нам доверяют клиенты' },
  en: { title: 'Why Choose Us', subtitle: 'The reasons our clients trust us' },
};

export default function WhyChooseUs() {
  const { lang } = useLang();
  const items = ITEMS[lang];
  const text = SECTION_TITLE[lang];

  return (
    <section className="relative py-24 px-6">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <TiltCard className="h-full text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500/20 to-cyan-400/20 flex items-center justify-center mb-5">
                    <Icon size={26} className="text-electric-500 dark:text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">{item.desc}</p>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold text-gradient">{item.stat}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.statLabel}</div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}