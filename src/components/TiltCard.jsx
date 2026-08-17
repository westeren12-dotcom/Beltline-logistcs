import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setRotate({
      x: (py - 0.5) * -intensity,
      y: (px - 0.5) * intensity,
    });
    setGlowPos({ x: px * 100, y: py * 100 });
  };

  const reset = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={cn(
        'relative rounded-3xl glass dark:glass border-gradient p-6 overflow-hidden group',
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(77,159,255,0.15), transparent 60%)`,
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  );
}