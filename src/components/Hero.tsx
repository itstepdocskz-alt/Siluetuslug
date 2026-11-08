import React from 'react';
import { ArrowDown, ArrowUpRight, Film, Play } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
  onPlayHeroVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenInquiry, onPlayHeroVideo }) => {
  const hasRealVideo = Boolean(config.heroVideo.enabled && config.heroVideo.videoUrl);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-[#363B35]">
      {/* Background ambient texture lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #363B35 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Надзаголовок */}
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block w-2.5 h-[1.5px] bg-[#D5F45B]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#B0B5AD]">
                SILUET / ВИДЕОМОНТАЖ
              </span>
            </div>

            {/* Главный заголовок */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#F2F1E9] mb-8 text-balance">
              Монтаж, который <br />
              <span className="inline-block relative">
                передаёт эмоции.
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#D5F45B]/60" aria-hidden="true" />
              </span>
            </h1>

            {/* Описание */}
            <p className="text-base sm:text-lg text-[#B0B5AD] max-w-xl mb-10 leading-relaxed font-normal">
              Собираю ваши кадры в цельную историю. Монтирую YouTube-видео и Reels для блогеров и бизнеса — с вниманием к ритму, звуку и деталям.
            </p>

            {/* Кнопки */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Акцентная кнопка */}
              <a
                href="#works"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c8e84e] active:scale-[0.98] transition-all duration-200 rounded-none shadow-sm"
              >
                <span>Смотреть работы</span>
                <ArrowDown className="w-4 h-4 text-[#141615]" />
              </a>

              {/* Спокойная контурная */}
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F2F1E9] bg-transparent border border-[#363B35] hover:border-[#B0B5AD] hover:bg-[#1E211F] active:scale-[0.98] transition-all duration-200 rounded-none"
              >
                <span>Обсудить проект</span>
                <ArrowUpRight className="w-4 h-4 text-[#B0B5AD]" />
              </button>
            </div>

            {/* Subtle editorial availability note */}
            <div className="mt-8 pt-6 border-t border-[#363B35]/70 flex items-center gap-4 text-xs text-[#B0B5AD]">
              <span className="font-mono text-[11px] text-[#D5F45B] tracking-wider uppercase">[СТАТУС]</span>
              <span>{config.status}</span>
            </div>
          </div>

          {/* Right Column: 16:9 Video Block with Slight Asymmetric Offset */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group lg:translate-y-3 lg:rotate-[-0.6deg] hover:rotate-0 transition-transform duration-300">
              
              {/* Card Container with almost straight corners and surface background */}
              <div className="w-full aspect-video bg-[#1E211F] border border-[#363B35] relative overflow-hidden rounded-[2px] shadow-2xl">
                
                {hasRealVideo ? (
                  /* Real Video Player */
                  <div className="w-full h-full relative group">
                    <iframe
                      src={config.heroVideo.videoUrl}
                      title="Siluet Showreel"
                      className="w-full h-full object-cover pointer-events-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {onPlayHeroVideo && (
                      <button
                        onClick={onPlayHeroVideo}
                        className="absolute inset-0 flex items-center justify-center bg-[#141615]/40 hover:bg-[#141615]/20 transition-colors"
                        aria-label="Смотреть шоурил"
                      >
                        <div className="w-14 h-14 bg-[#D5F45B] text-[#141615] flex items-center justify-center rounded-none shadow-lg">
                          <Play className="w-6 h-6 fill-current" />
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Signature Abstract Montage Composition (История / Ритм / Эмоция) - NO play button! */
                  <div 
                    className="w-full h-full p-6 flex flex-col justify-between select-none relative bg-gradient-to-br from-[#1E211F] via-[#171918] to-[#141615]"
                    aria-label="Фирменная визуальная композиция Siluet: шкала монтажа, таймкод и триада монтажёра"
                  >
                    {/* Viewfinder crosshairs at corners */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#363B35]" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#363B35]" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#363B35]" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#363B35]" />

                    {/* Top row: Format & Real-time TC counter */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B0B5AD] tracking-wider z-10">
                      <div className="flex items-center gap-2">
                        <Film className="w-3.5 h-3.5 text-[#D5F45B]" />
                        <span>TIMELINE 01 // 24 FPS</span>
                      </div>
                      <span className="text-[#D5F45B] tabular-nums font-semibold">00:01:24:16</span>
                    </div>

                    {/* Center: Overlapping Graphic Frames & Expressive Typography */}
                    <div className="my-auto relative py-2">
                      {/* Overlapping translucent film cut rectangles */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="w-48 h-28 border border-[#363B35] transform -rotate-3 translate-x-2" />
                        <div className="w-52 h-32 border border-[#D5F45B]/20 transform rotate-2 -translate-x-3" />
                      </div>

                      {/* Signature Words: «История / Ритм / Эмоция» */}
                      <div className="relative text-center z-10">
                        <div className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-[#F2F1E9]">
                          История <span className="text-[#D5F45B]">/</span> Ритм <span className="text-[#D5F45B]">/</span> Эмоция
                        </div>
                        <div className="mt-1 text-xs text-[#B0B5AD] tracking-widest uppercase font-mono">
                          Siluet Visual Rhythm Core
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Thin Montage Timeline Ruler & Waveform */}
                    <div className="w-full space-y-1.5 z-10">
                      {/* Waveform graphic */}
                      <div className="h-4 flex items-end gap-1 opacity-60">
                        {[40, 65, 30, 85, 95, 45, 20, 75, 90, 60, 35, 80, 100, 70, 50, 30, 85, 60, 95, 40, 70, 85, 30, 60, 90, 45, 75, 100, 60, 40, 85, 55, 30].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 transition-all ${i === 18 ? 'bg-[#D5F45B]' : 'bg-[#363B35]'}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      {/* Timeline bar with playhead needle and cut markers */}
                      <div className="relative h-2 w-full bg-[#141615] border border-[#363B35]">
                        {/* Playhead marker in accent color */}
                        <div 
                          className="absolute top-0 bottom-0 w-[2px] bg-[#D5F45B]" 
                          style={{ left: '56%' }}
                        >
                          <div className="w-2 h-2 -ml-[3px] -mt-1 bg-[#D5F45B] rotate-45" />
                        </div>

                        {/* Splice cut markers */}
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#F2F1E9]/40" style={{ left: '22%' }} />
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#F2F1E9]/40" style={{ left: '78%' }} />
                      </div>

                      {/* Timeline scale indicators */}
                      <div className="flex justify-between text-[9px] font-mono text-[#B0B5AD]/70">
                        <span>00:00:00</span>
                        <span>00:01:00</span>
                        <span>00:02:00</span>
                        <span>00:03:00</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Offset decorative frame corner */}
              <div 
                className="absolute -bottom-2 -right-2 w-full h-full border border-[#363B35]/40 -z-10 pointer-events-none rounded-[2px]" 
                aria-hidden="true" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
