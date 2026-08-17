import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height, nodes;

    const NODE_COUNT = 70;
    const LINK_DIST = 150;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      }));
    }

    function handleMouse(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const nodeColor = isDark ? 'rgba(77, 159, 255, 0.9)' : 'rgba(47, 90, 200, 0.55)';
      const lineColorBase = isDark ? '77, 159, 255' : '80, 120, 220';
      const glowColor = isDark ? 'rgba(62, 232, 245, 0.9)' : 'rgba(60, 140, 230, 0.5)';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          n.x -= dx * 0.003;
          n.y -= dy * 0.003;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const ddx = n.x - m.x;
          const ddy = n.y - m.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${lineColorBase}, ${1 - d / LINK_DIST})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // cursor spotlight
      const grad = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 220
      );
      grad.addColorStop(0, isDark ? 'rgba(77,159,255,0.10)' : 'rgba(80,140,230,0.08)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    window.addEventListener('resize', () => { resize(); initNodes(); });
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700 bg-white dark:bg-navy-950">
      {/* Aurora blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-electric-500/20 dark:bg-electric-500/30 blur-[100px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/15 dark:bg-purple-500/25 blur-[100px] animate-aurora" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-400/15 dark:bg-cyan-400/25 blur-[100px] animate-aurora" style={{ animationDelay: '6s' }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? '#4d9fff' : '#1a5cff'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}