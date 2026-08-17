import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Truck, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useLang } from '../context/LangContext.jsx';
import { loginWithEmail, loginWithGoogle } from '../firebase/authService.js';

const TEXT = {
  uz: {
    title: 'Xush kelibsiz', subtitle: 'Hisobingizga kiring',
    email: 'Email manzil', password: 'Parol', login: 'Kirish',
    or: 'yoki', google: 'Google orqali davom etish',
    noAccount: 'Hisobingiz yo\'qmi?', signup: 'Ro\'yxatdan o\'ting',
    error: 'Email yoki parol noto\'g\'ri',
  },
  ru: {
    title: 'Добро пожаловать', subtitle: 'Войдите в свой аккаунт',
    email: 'Email адрес', password: 'Пароль', login: 'Войти',
    or: 'или', google: 'Продолжить с Google',
    noAccount: 'Нет аккаунта?', signup: 'Зарегистрироваться',
    error: 'Неверный email или пароль',
  },
  en: {
    title: 'Welcome Back', subtitle: 'Sign in to your account',
    email: 'Email address', password: 'Password', login: 'Sign In',
    or: 'or', google: 'Continue with Google',
    noAccount: "Don't have an account?", signup: 'Sign up',
    error: 'Invalid email or password',
  },
};

export default function LoginPage() {
  const { lang } = useLang();
  const t = TEXT[lang];
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl glass border-gradient p-8 md:p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-electric-500/30">
            <Truck size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-5"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email}
              className="input-field pl-11"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password}
              className="input-field pl-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-electric-500 to-cyan-500 shadow-lg shadow-electric-500/30 disabled:opacity-60"
          >
            {t.login}
          </motion.button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-400">{t.or}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-semibold glass border-gradient text-navy-900 dark:text-white disabled:opacity-60"
        >
          <FcGoogle size={20} />
          {t.google}
        </motion.button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-7">
          {t.noAccount}{' '}
          <Link to="/signup" className="font-semibold text-electric-500 dark:text-cyan-300">
            {t.signup}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}