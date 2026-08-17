import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';
import TiltCard from '../components/TiltCard.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

const PAGE_TEXT = {
  uz: {
    badge: 'Aloqa',
    title1: 'Biz Bilan',
    title2: 'Bog\'laning',
    subtitle: 'Savollaringiz bormi? Jamoamiz sizga tez orada javob beradi.',
    infoTitle: 'Kontakt ma\'lumotlari',
    address: 'Toshkent sh., Yunusobod tumani',
    formTitle: 'Xabar yuboring',
    name: 'Ismingiz',
    email: 'Email manzil',
    message: 'Xabaringiz',
    submit: 'Yuborish',
    successTitle: 'Rahmat!',
    successMsg: 'Xabaringiz qabul qilindi, tez orada bog\'lanamiz.',
  },
  ru: {
    badge: 'Контакты',
    title1: 'Свяжитесь',
    title2: 'С Нами',
    subtitle: 'Есть вопросы? Наша команда ответит вам в кратчайшие сроки.',
    infoTitle: 'Контактная информация',
    address: 'г. Ташкент, Юнусабадский район',
    formTitle: 'Отправить сообщение',
    name: 'Ваше имя',
    email: 'Email адрес',
    message: 'Ваше сообщение',
    submit: 'Отправить',
    successTitle: 'Спасибо!',
    successMsg: 'Ваше сообщение получено, мы скоро свяжемся с вами.',
  },
  en: {
    badge: 'Contact',
    title1: 'Get In',
    title2: 'Touch With Us',
    subtitle: 'Have questions? Our team will get back to you shortly.',
    infoTitle: 'Contact Information',
    address: 'Tashkent, Yunusabad district',
    formTitle: 'Send a Message',
    name: 'Your Name',
    email: 'Email Address',
    message: 'Your Message',
    submit: 'Send Message',
    successTitle: 'Thank You!',
    successMsg: 'Your message has been received, we\'ll get back to you soon.',
  },
};

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 ' +
  'text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ' +
  'focus:ring-electric-500/50 transition-shadow text-sm';

export default function ContactPage() {
  const { lang } = useLang();
  const text = PAGE_TEXT[lang];

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // TODO: backend/API ulanganda shu yerga fetch/axios chaqiruvi qo'shiladi
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Phone, label: '+998 71 200 00 00' },
    { icon: Mail, label: 'info@company.com' },
    { icon: MapPin, label: text.address },
  ];

  return (
    <div className="pt-40 pb-20">
      {/* Header */}
      <section className="px-6 mb-16">
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

      {/* Info + Form */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-3xl glass border-gradient p-8 h-fit"
          >
            <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-6">{text.infoTitle}</h2>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-electric-500/20 to-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-electric-500 dark:text-cyan-300" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 rounded-3xl bg-gradient-to-br from-electric-500/10 to-cyan-400/10 border border-electric-500/20 p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{text.successTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400">{text.successMsg}</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-6">{text.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={text.name}
                    className={inputClasses}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={text.email}
                    className={inputClasses}
                    required
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={text.message}
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    required
                  />
                  <MagneticButton>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white
                                 bg-gradient-to-r from-electric-500 to-cyan-500 shadow-lg shadow-electric-500/30
                                 hover:shadow-electric-500/50 transition-shadow"
                    >
                      {text.submit}
                      <Send size={16} />
                    </button>
                  </MagneticButton>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}