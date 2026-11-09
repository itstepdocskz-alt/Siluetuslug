import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Play, Film, Disc3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
  onPlayHeroVideo?: () => void;
}

const ROLES = [
  'YouTube-видео и масштабные шоу',
  'Виральные динамичные Reels & Shorts',
  'Имиджевые промо и реклама брендов',
  'Кинематографичный саунд-дизайн и цвет',
];

export const Hero: React.FC<HeroProps> = ({ config, onOpenInquiry, onPlayHeroVideo }) => {
  const hasRealVideo = Boolean(config.heroVideo.enabled && config.heroVideo.videoUrl);
  const [roleIndex, setRoleIndex] = useState(0);
  const [timelinePlayhead, setTimelinePlayhead] = useState(54);

  // Cycle role titles every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Subtle real-time playhead animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelinePlayhead((prev) => (prev >= 92 ? 15 : prev + 0.4));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-10 pb-20 md:pt-18 md:pb-32 overflow-hidden border-b border-[#2e332d]">
      
      {/* Dynamic ambient background glow and cinema grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial spotlight */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D5F45B]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#4FF4D2]/4 rounded-full blur-[160px]" />
        
        {/* Subtle cinematic grid */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #363B35 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        {/* Viewfinder corner guides */}
        <div className="max-w-7xl mx-auto px-4 h-full relative">
          <div className="absolute top-6 left-6 text-[#363B35] font-mono text-[10px] select-none">
            [+] TC 24.00 FPS / REC
          </div>
          <div className="absolute top-6 right-6 text-[#363B35] font-mono text-[10px] select-none">
            [4K DCI · 2.39:1]
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Huge Headline & Dynamic Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Overline with recording indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 px-2.5 py-1 bg-[#171a18] border border-[#2e332d]">
                <span className="w-2 h-2 rounded-full bg-[#D5F45B] animate-pulse" />
                <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-[#F2F1E9]">
                  SILUET / ВИДЕОМОНТАЖ
                </span>
              </div>
              <span className="text-xs font-mono text-[#B0B5AD]/70 hidden sm:inline">
                · Режиссура монтажа &amp; саунд
              </span>
            </motion.div>

            {/* Huge Impactful Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.04] tracking-tight text-[#F2F1E9] mb-6 text-balance"
            >
              Монтаж, который <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F2F1E9] via-[#F2F1E9] to-[#D5F45B]">
                передаёт эмоции.
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#D5F45B] to-transparent opacity-80" />
              </span>
            </motion.h1>

            {/* Animated Typing/Cycling Role Text */}
            <div className="h-8 mb-6 flex items-center overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B0B5AD] mr-2">
                Специализация:
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="font-mono text-xs sm:text-sm font-semibold text-[#D5F45B] tracking-wide"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#B0B5AD] max-w-xl mb-10 leading-relaxed font-normal"
            >
              Собираю ваши кадры в цельную историю. Монтирую YouTube-видео и Reels для блогеров и бизнеса — с вниманием к ритму, звуку и деталям.
            </motion.p>

            {/* Action Buttons: Посмотреть работы & Заказать монтаж */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary Glowing Button */}
              <a
                href="#works"
                className="relative group overflow-hidden inline-flex items-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(213,244,91,0.3)] hover:shadow-[0_0_40px_rgba(213,244,91,0.5)]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span className="relative font-bold">Посмотреть работы</span>
                <ArrowDown className="w-4 h-4 text-[#141615] transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>

              {/* Secondary Outline Glowing Button */}
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F2F1E9] bg-[#141615]/80 hover:bg-[#1c1f1d] border border-[#2e332d] hover:border-[#D5F45B]/70 active:scale-[0.98] transition-all duration-200 group shadow-sm hover:shadow-[0_0_20px_rgba(213,244,91,0.15)]"
              >
                <span>Заказать монтаж</span>
                <ArrowUpRight className="w-4 h-4 text-[#B0B5AD] group-hover:text-[#D5F45B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

            {/* Editorial Status Strip */}
            <div className="mt-10 pt-6 border-t border-[#2e332d] flex flex-wrap items-center justify-between gap-4 text-xs text-[#B0B5AD]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D5F45B]" />
                <span className="font-mono text-[11px] text-[#D5F45B] tracking-wider uppercase">[СТАТУС]</span>
                <span className="text-[#F2F1E9]">{config.status}</span>
              </div>
              <div className="font-mono text-[11px] text-[#B0B5AD]/70">
                PRORES 422 HQ // 4K READY
              </div>
            </div>
          </div>

          {/* Right Column: 16:9 Cinematic Video Block */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group lg:translate-y-2"
            >
              {/* Outer soft ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D5F45B]/20 to-[#4FF4D2]/10 rounded-none blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Main 16:9 Card Container */}
              <div 
                data-cursor={hasRealVideo ? "video" : "view"}
                className="relative w-full aspect-video bg-[#121413] border border-[#2e332d] group-hover:border-[#D5F45B]/60 transition-all duration-300 overflow-hidden shadow-2xl"
              >
                {hasRealVideo ? (
                  /* Real Video Player */
                  <div className="w-full h-full relative group">
                    <iframe
                      src={config.heroVideo.videoUrl}
                      title="Siluet Showreel"
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {onPlayHeroVideo && (
                      <button
                        onClick={onPlayHeroVideo}
                        className="absolute inset-0 flex items-center justify-center bg-[#141615]/40 hover:bg-[#141615]/20 transition-colors"
                        aria-label="Смотреть шоурил"
                      >
                        <div className="w-16 h-16 bg-[#D5F45B] text-[#141615] flex items-center justify-center rounded-none shadow-[0_0_30px_rgba(213,244,91,0.6)] group-hover:scale-105 transition-transform">
                          <Play className="w-7 h-7 fill-current translate-x-0.5" />
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Signature Abstract Montage Composition (История / Ритм / Эмоция) */
                  <div 
                    className="w-full h-full p-6 flex flex-col justify-between select-none relative bg-gradient-to-br from-[#171a18] via-[#121413] to-[#0c0e0d]"
                    aria-label="Фирменная визуальная композиция Siluet: шкала монтажа, таймкод и триада монтажёра"
                  >
                    {/* Viewfinder crosshairs at corners */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D5F45B]/50" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D5F45B]/50" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D5F45B]/50" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D5F45B]/50" />

                    {/* Top row: Track & Live Timecode */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B0B5AD] tracking-wider z-10">
                      <div className="flex items-center gap-2">
                        <Film className="w-3.5 h-3.5 text-[#D5F45B]" />
                        <span className="text-[#F2F1E9]">TIMELINE 01</span>
                        <span className="text-[#363B35]">/</span>
                        <span className="text-[#B0B5AD]">24.00 FPS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5F45B] animate-ping" />
                        <span className="text-[#D5F45B] tabular-nums font-bold tracking-widest">00:01:24:16</span>
                      </div>
                    </div>

                    {/* Center: Signature Editorial Montage Triad */}
                    <div className="my-auto relative py-3">
                      {/* Overlapping geometry framing */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="w-56 h-32 border border-[#363B35] transform -rotate-3 translate-x-2" />
                        <div className="w-60 h-36 border border-[#D5F45B] transform rotate-2 -translate-x-2" />
                      </div>

                      <div className="relative text-center z-10 space-y-1">
                        <div className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#F2F1E9]">
                          История <span className="text-[#D5F45B]">/</span> Ритм <span className="text-[#D5F45B]">/</span> Эмоция
                        </div>
                        <div className="text-[11px] font-mono text-[#B0B5AD] tracking-widest uppercase flex items-center justify-center gap-2">
                          <Disc3 className="w-3 h-3 text-[#D5F45B] animate-spin" />
                          <span>Siluet Visual Rhythm Core</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Dynamic Timeline Track Layers & Waveform */}
                    <div className="w-full space-y-2 z-10">
                      
                      {/* Audio frequency visualizer bars */}
                      <div className="h-5 flex items-end gap-1 opacity-80">
                        {[40, 70, 35, 90, 100, 50, 25, 80, 95, 65, 30, 85, 100, 75, 45, 30, 90, 65, 100, 45, 75, 90, 35, 65, 95, 50, 80, 100, 65, 35, 90, 55, 30].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 transition-all duration-150 ${
                              i % 4 === 0 ? 'bg-[#D5F45B]' : i % 2 === 0 ? 'bg-[#4FF4D2]/60' : 'bg-[#2e332d]'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      {/* Timeline bar with moving playhead and splice cuts */}
                      <div className="relative h-2.5 w-full bg-[#0a0c0b] border border-[#2e332d]">
                        {/* Playhead needle */}
                        <div 
                          className="absolute top-0 bottom-0 w-[2px] bg-[#D5F45B] shadow-[0_0_8px_#D5F45B] transition-all duration-100" 
                          style={{ left: `${timelinePlayhead}%` }}
                        >
                          <div className="w-2.5 h-2.5 -ml-[4px] -mt-1 bg-[#D5F45B] rotate-45 shadow-sm" />
                        </div>

                        {/* Cut points */}
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#F2F1E9]/40" style={{ left: '20%' }} />
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#F2F1E9]/40" style={{ left: '42%' }} />
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#F2F1E9]/40" style={{ left: '76%' }} />
                      </div>

                      {/* Timecode scale indicators */}
                      <div className="flex justify-between text-[9px] font-mono text-[#B0B5AD]/70">
                        <span>00:00:00:00</span>
                        <span>00:01:00:00</span>
                        <span>00:02:00:00</span>
                        <span>00:03:00:00</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
