import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Phone, Mail, Package, Weight, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LangContext.jsx';

const FORM_TEXT = {
  uz: {
    title: 'Narx So\'rovi Yuboring', subtitle: 'Formani to\'ldiring, 24 soat ichida siz bilan bog\'lanamiz',
    name: 'Ism Familiya', company: 'Kompaniya', phone: 'Telefon', email: 'Email',
    cargoType: 'Yuk turi', weight: 'Og\'irlik (kg)', destination: 'Manzil', message: 'Xabar',
    submit: 'Yuborish', success: 'So\'rovingiz qabul qilindi!', successDesc: 'Tez orada mutaxassislarimiz siz bilan bog\'lanadi.',
    required: 'Majburiy maydon',
  },
  ru: {
    title: 'Отправить Запрос Цены', subtitle: 'Заполните форму, мы свяжемся с вами в течение 24 часов',
    name: 'Имя Фамилия', company: 'Компания', phone: 'Телефон', email: 'Email',
    cargoType: 'Тип груза', weight: 'Вес (кг)', destination: 'Пункт назначения', message: 'Сообщение',
    submit: 'Отправить', success: 'Ваш запрос принят!', successDesc: 'Наши специалисты свяжутся с вами в ближайшее время.',
    required: 'Обязательное поле',
  },
  en: {
    title: 'Request a Quote', subtitle: 'Fill out the form and we\'ll get back to you within 24 hours',
    name: 'Full Name', company: 'Company', phone: 'Phone', email: 'Email',
    cargoType: 'Cargo Type', weight: 'Weight (kg)', destination: 'Destination', message: 'Message',
    submit: 'Send Request', success: 'Your request has been received!', successDesc: 'Our specialists will contact you shortly.',
    required: 'Required field',
  },
};

export default function QuoteForm() {
  const { lang } = useLang();
  const f = FORM_TEXT[lang];

  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', cargoType: '', weight: '', destination: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = true;
    if (!form.destination.trim()) newErrors.destination = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Bu yerda real loyihada backend/email API ga so'rov yuboriladi
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto rounded-3xl glass border-gradient p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-emerald-400/20 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 size={30} className="text-emerald-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{f.success}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{f.successDesc}</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="quote" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">{f.title}</h2>
          <p className="text-slate-600 dark:text-slate-400">{f.subtitle}</p>
        </motion.div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto rounded-3xl glass border-gradient p-8 md:p-10 grid md:grid-cols-2 gap-5"
      >
        <FormField label={f.name} icon={User} error={errors.name}>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} className={`input-field ${errors.name ? 'error' : ''}`} />
        </FormField>

        <FormField label={f.company} icon={Building2}>
          <input value={form.company} onChange={(e) => update('company', e.target.value)} className="input-field" />
        </FormField>

        <FormField label={f.phone} icon={Phone} error={errors.phone}>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+998 90 123 45 67" className={`input-field ${errors.phone ? 'error' : ''}`} />
        </FormField>

        <FormField label={f.email} icon={Mail} error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={`input-field ${errors.email ? 'error' : ''}`} />
        </FormField>

        <FormField label={f.cargoType} icon={Package}>
          <input value={form.cargoType} onChange={(e) => update('cargoType', e.target.value)} className="input-field" />
        </FormField>

        <FormField label={f.weight} icon={Weight}>
          <input type="number" value={form.weight} onChange={(e) => update('weight', e.target.value)} className="input-field" />
        </FormField>

        <FormField label={f.destination} icon={MapPin} error={errors.destination} full>
          <input value={form.destination} onChange={(e) => update('destination', e.target.value)} className={`input-field ${errors.destination ? 'error' : ''}`} />
        </FormField>

        <FormField label={f.message} icon={MessageSquare} full>
          <textarea rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} className="input-field resize-none" />
        </FormField>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="md:col-span-2 mt-2 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white
                     bg-gradient-to-r from-electric-500 to-cyan-500 shadow-xl shadow-electric-500/30"
        >
          <Send size={17} />
          {f.submit}
        </motion.button>
      </motion.form>
    </section>
  );
}

function FormField({ label, icon: Icon, children, error, full }) {
  return (
    <div className={full ? 'md:col-span-2 text-left' : 'text-left'}>
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
        <Icon size={13} />
        {label}
      </label>
      {children}
    </div>
  );
}