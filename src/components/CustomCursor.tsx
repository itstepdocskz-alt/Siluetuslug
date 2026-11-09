import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'video' | 'drag'>('default');
  const [label, setLabel] = useState<string>('');

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(-100, dotConfig);
  const dotY = useSpring(-100, dotConfig);

  useEffect(() => {
    // Only enable on non-touch desktop screens without reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      const videoCard = target.closest('[data-cursor="video"]');
      const viewCard = target.closest('[data-cursor="view"]');

      if (videoCard) {
        setCursorState('video');
        setLabel('PLAY');
      } else if (viewCard) {
        setCursorState('hover');
        setLabel('VIEW');
      } else if (interactive) {
        setCursorState('hover');
        setLabel('');
      } else {
        setCursorState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer follow circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorState === 'video' ? 68 : cursorState === 'hover' ? 44 : 28,
          height: cursorState === 'video' ? 68 : cursorState === 'hover' ? 44 : 28,
          backgroundColor:
            cursorState === 'video'
              ? 'rgba(213, 244, 91, 0.95)'
              : cursorState === 'hover'
              ? 'rgba(213, 244, 91, 0.15)'
              : 'rgba(213, 244, 91, 0.04)',
          borderColor:
            cursorState === 'video'
              ? '#D5F45B'
              : cursorState === 'hover'
              ? 'rgba(213, 244, 91, 0.8)'
              : 'rgba(213, 244, 91, 0.35)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {label && (
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#141615] uppercase select-none">
            {label}
          </span>
        )}
      </motion.div>

      {/* Tiny sharp center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 bg-[#D5F45B] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#D5F45B]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity: cursorState === 'video' ? 0 : 1,
          scale: cursorState === 'hover' ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};
