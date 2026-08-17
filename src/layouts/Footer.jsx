import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Phone, Mail, MapPin, Send } from 'lucide-react';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLang } from '../context/LangContext.jsx';
import company from '../data/company.json';
import services from '../data/services.json';

export default function Footer() {
  const { t, lang } = useLang();

  const quickLinks = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/tracking', label: t.nav.tracking },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center">
              <Truck size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-navy-900 dark:text-white">
              {company.shortName}<span className="text-gradient"> Logistics</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
            {t.footer.desc}
          </p>
          <div className="flex items-center gap-3">
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass border-gradient flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:scale-105 transition-all" aria-label="Telegram">
              <FaTelegramPlane size={14} />
            </a>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass border-gradient flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:scale-105 transition-all" aria-label="Instagram">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-navy-900 dark:text-white mb-4">{t.footer.services}</h4>
          <ul className="space-y-2.5">
            {services.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link to="/services" className="text-sm text-slate-500 dark:text-slate-400 hover:text-electric-500 dark:hover:text-cyan-300 transition-colors">
                  {s.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-navy-900 dark:text-white mb-4">{t.footer.links}</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-electric-500 dark:hover:text-cyan-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-navy-900 dark:text-white mb-4">{t.footer.contactTitle}</h4>
          <ul className="space-y-2.5 mb-6">
            <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Phone size={13} />
              <a href={"tel:" + company.phone.replace(/\s/g, '')} className="hover:text-cyan-400 transition-colors">
                {company.phone}
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Mail size={13} />
              <a href={"mailto:" + company.email} className="hover:text-cyan-400 transition-colors">
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={13} />
              {company.address}
            </li>
          </ul>

          <h4 className="font-semibold text-navy-900 dark:text-white mb-3 text-sm">{t.footer.newsletter}</h4>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-3 py-2.5 rounded-full text-xs bg-white/5 border border-white/10 focus:border-electric-500 outline-none text-navy-900 dark:text-white placeholder:text-slate-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-r from-electric-500 to-cyan-500 flex items-center justify-center text-white"
            >
              <Send size={13} />
            </motion.button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <span>&copy; {new Date().getFullYear()} {company.name}. {t.footer.rights}</span>
          <span>Tashkent, Uzbekistan</span>
        </div>
      </div>
    </footer>
  );
}