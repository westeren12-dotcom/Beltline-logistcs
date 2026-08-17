import { motion } from 'framer-motion';
import { Phone, Mail, Clock } from 'lucide-react';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLang } from '../context/LangContext.jsx';
import company from '../data/company.json';

const LANGS = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export default function TopBar() {
  const { lang, changeLang, t } = useLang();

  return (
    <div className="hidden md:block relative z-50 w-full border-b border-white/5 bg-navy-950/40 dark:bg-navy-950/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-5">
          <a href={"tel:" + company.phone.replace(/\s/g, '')} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
            <Phone size={12} />
            {company.phone}
          </a>
          <a href={"mailto:" + company.email} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
            <Mail size={12} />
            {company.email}
          </a>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {t.topbar.hours}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Telegram">
              <FaTelegramPlane size={13} />
            </a>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Instagram">
              <FaInstagram size={13} />
            </a>
          </div>

          <div className="w-px h-4 bg-white/10" />

          <div className="flex items-center gap-1 relative">
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => changeLang(l.code)} className="relative px-2 py-1 font-medium tracking-wide">
                {lang === l.code && (
                  <motion.div
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-electric-500/20 border border-electric-500/40"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
                <span className={lang === l.code ? 'relative z-10 text-cyan-400' : 'relative z-10'}>
                  {l.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}