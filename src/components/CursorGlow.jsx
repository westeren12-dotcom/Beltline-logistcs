import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function CursorGlow() {
  const { isDark } = useTheme();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  const springY = useSpring(y, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full -z-[5] hidden lg:block"
      style={{
        x: springX,
        y: springY,
        background: isDark
          ? 'radial-gradient(circle, rgba(62,232,245,0.10) 0%, rgba(77,159,255,0.04) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(47,90,200,0.06) 0%, rgba(80,140,230,0.02) 40%, transparent 70%)',
      }}
    />
  );
}