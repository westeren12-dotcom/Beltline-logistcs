import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Truck, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useLang } from '../context/LangContext.jsx';
import { registerWithEmail, loginWithGoogle } from '../firebase/authService.js';

const TEXT = {
  uz: {
    title: 'Hisob Yarating', subtitle: 'Bir necha soniyada ro\'yxatdan o\'ting',
    name: 'Ism Familiya', email: 'Email manzil', password: 'Parol', signup: 'Ro\'yxatdan o\'tish',
    or: 'yoki', google: 'Google orqali davom etish',
    hasAccount: 'Allaqachon hisobingiz bormi?', login: 'Kirish',
    error: 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
  },
  ru: {
    title: 'Создать Аккаунт', subtitle: 'Зарегистрируйтесь за несколько секунд',
    name: 'Имя Фамилия', email: 'Email адрес', password: 'Пароль', signup: 'Зарегистрироваться',
    or: 'или', google: 'Продолжить с Google',
    hasAccount: 'Уже есть аккаунт?', login: 'Войти',
    error: 'Произошла ошибка при регистрации',
  },
  en: {
    title: 'Create Account', subtitle: 'Sign up in just a few seconds',
    name: 'Full Name', email: 'Email address', password: 'Password', signup: 'Sign Up',
    or: 'or', google: 'Continue with Google',
    hasAccount: 'Already have an account?', login: 'Sign in',
    error: 'Something went wrong during sign up',
  },
};

export default function SignUpPage() {
  const { lang } = useLang();
  const t = TEXT[lang];
  const navigate = useNavigate();

  const [name, setName] = useState('');
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
      await registerWithEmail(name, email, password);
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
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.name}
              className="input-field pl-11"
            />
          </div>

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
              minLength={6}
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
            {t.signup}
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
          {t.hasAccount}{' '}
          <Link to="/login" className="font-semibold text-electric-500 dark:text-cyan-300">
            {t.login}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}