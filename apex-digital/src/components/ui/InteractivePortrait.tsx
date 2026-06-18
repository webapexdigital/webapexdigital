import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

const SPRING = { stiffness: 110, damping: 22, mass: 0.9 };

interface Props {
  children:   React.ReactNode;
  className?: string;
  style?:     React.CSSProperties;
}

/** Wraps any content with mouse-tracked 3D tilt + parallax orb layers. */
export default function InteractivePortrait({ children, className = '', style }: Props) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const sx = useSpring(rawX, SPRING);
  const sy = useSpring(rawY, SPRING);

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  // Wing parallax — exaggerated offset relative to card tilt
  const w1x = useTransform(sx, [-0.5, 0.5], [-60, 60]);
  const w1y = useTransform(sy, [-0.5, 0.5], [-36, 36]);
  const w2x = useTransform(sx, [-0.5, 0.5], [55, -55]);
  const w2y = useTransform(sy, [-0.5, 0.5], [28, -28]);

  // Orb parallax — mid depth
  const o1x = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const o1y = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const o2x = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const o2y = useTransform(sy, [-0.5, 0.5], [16, -16]);

  const track = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const reset = () => { rawX.set(0); rawY.set(0); };

  return (
    <div
      ref={ref}
      onMouseMove={track}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{ perspective: '1100px', ...style }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >

        {/* ── Wing blob — left ───────────────────────────────────── */}
        <motion.div
          style={{ x: w1x, y: w1y }}
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden
        >
          <motion.div
            className="absolute rounded-full"
            animate={{ opacity: [0.22, 0.38, 0.22], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 260, height: 200,
              left: '-14%', top: '22%',
              background: 'radial-gradient(ellipse, rgba(123,60,232,0.55) 0%, rgba(0,153,255,0.25) 55%, transparent 100%)',
              filter: 'blur(32px)',
            }}
          />
        </motion.div>

        {/* ── Wing blob — right ──────────────────────────────────── */}
        <motion.div
          style={{ x: w2x, y: w2y }}
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden
        >
          <motion.div
            className="absolute rounded-full"
            animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            style={{
              width: 240, height: 190,
              right: '-12%', top: '28%',
              background: 'radial-gradient(ellipse, rgba(0,153,255,0.55) 0%, rgba(123,60,232,0.22) 55%, transparent 100%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>

        {/* ── Small accent orb — top ──────────────────────────────── */}
        <motion.div
          style={{ x: o1x, y: o1y }}
          className="absolute pointer-events-none z-[3]"
          aria-hidden
        >
          <motion.div
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 100, height: 100,
              top: '6%', left: '10%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,60,232,0.7) 0%, transparent 70%)',
              filter: 'blur(18px)',
            }}
          />
        </motion.div>

        {/* ── Small accent orb — bottom right ────────────────────── */}
        <motion.div
          style={{ x: o2x, y: o2y }}
          className="absolute pointer-events-none z-[3]"
          aria-hidden
        >
          <motion.div
            animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            style={{
              position: 'absolute',
              width: 80, height: 80,
              bottom: '10%', right: '8%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,153,255,0.65) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
        </motion.div>

        {/* ── Slow-spinning ring ─────────────────────────────────── */}
        <motion.div
          className="absolute pointer-events-none z-[3]"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ top: '8%', right: '10%' }}
          aria-hidden
        >
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            border: '1.5px solid rgba(0,153,255,0.30)',
            boxShadow: '0 0 16px rgba(0,153,255,0.20)',
          }} />
        </motion.div>

        {/* ── Content (image / canvas / anything) ────────────────── */}
        <div className="relative z-[2] w-full h-full">
          {children}
        </div>

      </motion.div>
    </div>
  );
}
