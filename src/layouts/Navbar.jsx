import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Truck } from 'lucide-react';
import TopBar from './TopBar.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLang } from '../context/LangContext.jsx';
import company from '../data/company.json';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLang } from '../context/LangContext.jsx';


export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { t, lang, changeLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/tracking', label: t.nav.tracking },
    { to: '/routes', label: t.nav.routes },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBar />

      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? isDark ? 'rgba(10,14,39,0.75)' : 'rgba(255,255,255,0.75)'
            : 'rgba(0,0,0,0)',
          borderColor: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.12)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-xl border-b"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-electric-500/30 group-hover:scale-105 transition-transform">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-navy-900 dark:text-white">
              {company.shortName}<span className="text-gradient"> Logistics</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${location.pathname === link.to
                  ? 'text-electric-500 dark:text-cyan-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-electric-500 dark:hover:text-cyan-300'
                  }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-electric-500 to-cyan-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full glass dark:glass flex items-center justify-center text-slate-600 dark:text-cyan-300 hover:scale-105 transition-transform"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <Moon size={17} /> : <Sun size={17} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Login / Sign Up */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300
                           hover:text-electric-500 dark:hover:text-cyan-300 transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2.5 rounded-full text-sm font-semibold border border-electric-500/30
                           text-electric-500 dark:text-cyan-300 hover:bg-electric-500/10 transition-colors"
              >
                {t.nav.signup}
              </Link>
            </div>

            <MagneticButton>
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-sm text-white
                           bg-gradient-to-r from-electric-500 to-cyan-500 shadow-lg shadow-electric-500/30
                           hover:shadow-electric-500/50 transition-shadow"
              >
                {t.nav.quote}
              </Link>
            </MagneticButton>

            <button
              className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-slate-700 dark:text-white"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass dark:glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-3 px-3 rounded-lg text-sm font-medium ${location.pathname === link.to
                      ? 'text-electric-500 dark:text-cyan-300 bg-electric-500/10'
                      : 'text-slate-600 dark:text-slate-300'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/contact"
                className="mt-2 text-center py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-electric-500 to-cyan-500"
              >
                {t.nav.quote}
              </Link>

              <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/10">
                <div className="flex items-center gap-1">
                  {['uz', 'ru', 'en'].map((code) => (
                    <button
                      key={code}
                      onClick={() => changeLang(code)}
                      className={
                        lang === code
                          ? 'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors bg-electric-500/20 text-cyan-400 border border-electric-500/40'
                          : 'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors text-slate-500 dark:text-slate-400'
                      }
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass border-gradient flex items-center justify-center text-slate-600 dark:text-slate-300" aria-label="Telegram">
                    <FaTelegramPlane size={14} />
                  </a>
                  <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass border-gradient flex items-center justify-center text-slate-600 dark:text-slate-300" aria-label="Instagram">
                    <FaInstagram size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header >
  );
}