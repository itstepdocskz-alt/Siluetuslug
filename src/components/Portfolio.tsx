import React, { useState } from 'react';
import { ArrowUpRight, Play, Film, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
  demoPlaceholders: Project[];
  demoMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  projects,
  demoPlaceholders,
  demoMode,
  onSelectProject,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const publishedProjects = projects.filter((p) => p.published);

  const filteredProjects = publishedProjects.filter((p) => {
    if (selectedFormat === 'all') return true;
    if (selectedFormat === 'youtube') return p.format.toLowerCase().includes('youtube');
    if (selectedFormat === 'reels') return p.aspectRatio === '9:16' || p.format.toLowerCase().includes('reels');
    if (selectedFormat === 'commercial') return p.format.toLowerCase().includes('реклам') || p.format.toLowerCase().includes('commercial');
    return true;
  });

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  const categories = [
    { id: 'all', label: 'Все проекты', count: publishedProjects.length },
    { id: 'youtube', label: 'YouTube', count: publishedProjects.filter((p) => p.format.toLowerCase().includes('youtube')).length },
    { id: 'reels', label: 'Reels 9:16', count: publishedProjects.filter((p) => p.aspectRatio === '9:16' || p.format.toLowerCase().includes('reels')).length },
    { id: 'commercial', label: 'Реклама', count: publishedProjects.filter((p) => p.format.toLowerCase().includes('реклам') || p.format.toLowerCase().includes('commercial')).length },
  ];

  return (
    <section id="works" className="py-24 md:py-32 border-b border-[#2e332d] relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D5F45B]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Animated Filter Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-[1.5px] bg-[#D5F45B]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
                01 / ИЗБРАННЫЕ РАБОТЫ
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F1E9] tracking-tight">
              Портфолио
            </h2>
          </div>

          {/* Animated Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#151716] border border-[#2e332d]">
            {categories.map((tab) => {
              const isActive = selectedFormat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFormat(tab.id)}
                  className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-[#141615]' : 'text-[#B0B5AD] hover:text-[#F2F1E9]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#D5F45B] shadow-sm"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#141615]/70' : 'text-[#B0B5AD]/60'}`}>
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-16 text-center bg-[#151716] border border-[#2e332d] my-8">
            <Film className="w-10 h-10 text-[#B0B5AD] mx-auto mb-3 opacity-50" />
            <p className="text-base text-[#F2F1E9] font-medium">Нет опубликованных работ в этой категории</p>
            <p className="text-xs text-[#B0B5AD] mt-1">
              Напишите мне в Telegram, чтобы получить персональную подборку кейсов по вашей задаче.
            </p>
          </div>
        )}

        {/* 1. Featured Project (Large Prominent Showcase) */}
        {featuredProject && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div
              onClick={() => onSelectProject(featuredProject)}
              data-cursor="video"
              className="group cursor-pointer block bg-[#161817] border border-[#2e332d] hover:border-[#D5F45B]/80 hover:shadow-[0_0_40px_rgba(213,244,91,0.15)] transition-all duration-300 overflow-hidden"
            >
              {/* Media Container with smooth internal hover zoom */}
              <div className="relative aspect-video sm:aspect-[21/9] w-full bg-[#0d0f0e] overflow-hidden">
                <img
                  src={featuredProject.coverUrl}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e] via-[#0d0f0e]/30 to-transparent opacity-90" />

                {/* Duration and Category Badge */}
                <div className="absolute top-5 right-5 flex items-center gap-3 text-xs font-mono text-[#F2F1E9] bg-[#0e100f]/85 backdrop-blur-md px-3 py-1.5 border border-[#2e332d]">
                  <span className="text-[#D5F45B] font-semibold">{featuredProject.duration}</span>
                  <span className="text-[#363B35]">/</span>
                  <span>{featuredProject.year}</span>
                </div>

                {/* Center Hover Action Badge with Pulse */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 px-6 py-3 bg-[#D5F45B] text-[#141615] font-bold text-xs uppercase tracking-wider opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_30px_rgba(213,244,91,0.6)]">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    <span>Смотреть проект</span>
                  </div>
                </div>

                {/* Bottom Details on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D5F45B] animate-ping" />
                    <span className="text-[11px] font-mono tracking-widest text-[#D5F45B] uppercase">
                      ИЗБРАННЫЙ КЕЙС // {featuredProject.format}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#F2F1E9] tracking-tight group-hover:text-[#D5F45B] transition-colors duration-200">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>

              {/* Under Cover: Title, Format, Role, Tools */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#2e332d] bg-[#121413]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#B0B5AD]">
                  <span className="font-semibold text-[#F2F1E9]">{featuredProject.format}</span>
                  <span className="text-[#363B35]">·</span>
                  <span>{featuredProject.role}</span>
                  {featuredProject.tools?.length > 0 && (
                    <>
                      <span className="text-[#363B35]">·</span>
                      <span className="text-xs font-mono text-[#D5F45B]">{featuredProject.tools.slice(0, 2).join(' / ')}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5F45B] group-hover:translate-x-1 transition-transform duration-200">
                  <span>Подробнее о монтаже</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Secondary Projects Grid (Preserving Vertical 9:16 Aspect Strictly!) */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-16">
            <AnimatePresence>
              {secondaryProjects.map((project, idx) => {
                const isVertical = project.aspectRatio === '9:16';

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => onSelectProject(project)}
                    data-cursor="video"
                    className="group cursor-pointer flex flex-col bg-[#161817] border border-[#2e332d] hover:border-[#D5F45B]/70 hover:shadow-[0_0_30px_rgba(213,244,91,0.12)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Media Wrapper */}
                    <div
                      className={`relative w-full overflow-hidden bg-[#0d0f0e] ${
                        isVertical ? 'aspect-[9/16] max-h-[520px]' : 'aspect-video'
                      }`}
                    >
                      <img
                        src={project.coverUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e]/85 via-transparent to-transparent" />

                      {/* Top Timecode Badge */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-2 text-[11px] font-mono text-[#F2F1E9] bg-[#0e100f]/80 backdrop-blur-md px-2.5 py-1 border border-[#2e332d]">
                        <span>{project.duration}</span>
                      </div>

                      {/* Vertical Indicator */}
                      {isVertical && (
                        <div className="absolute top-3.5 left-3.5 text-[10px] font-mono text-[#D5F45B] bg-[#0e100f]/80 px-2 py-0.5 border border-[#2e332d] uppercase">
                          9:16 Reels
                        </div>
                      )}

                      {/* Center Play Button on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#D5F45B] text-[#141615] font-bold text-xs uppercase tracking-wider opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                          <span>Смотреть</span>
                        </div>
                      </div>
                    </div>

                    {/* Under Cover: Title, Format, Role */}
                    <div className="p-5 flex-1 flex flex-col justify-between border-t border-[#2e332d] bg-[#121413]">
                      <div>
                        <h4 className="font-display font-bold text-lg sm:text-xl text-[#F2F1E9] group-hover:text-[#D5F45B] transition-colors duration-200 mb-2 leading-snug">
                          {project.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#B0B5AD]">
                          <span className="font-medium text-[#F2F1E9]">{project.format}</span>
                          <span className="text-[#363B35]">·</span>
                          <span>{project.role}</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#222623] flex items-center justify-between text-xs text-[#B0B5AD]">
                        <span className="font-mono text-[11px]">{project.year}</span>
                        <span className="text-[#D5F45B] font-mono text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          <span>Открыть кейс</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* 3. Five Future Placeholder Slots (Demo Mode) */}
        {demoMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-[#2e332d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D5F45B]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#F2F1E9]">
                  ДЕМОНСТРАЦИОННЫЙ РЕЖИМ // 5 МЕСТ ПОД БУДУЩИЕ РАБОТЫ
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#B0B5AD]">
                (отключается в админ-панели для боевого сайта)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {demoPlaceholders.map((slot, index) => (
                <div
                  key={slot.id}
                  className="p-5 bg-[#121413] border border-dashed border-[#2e332d] hover:border-[#D5F45B]/60 transition-colors duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B0B5AD] mb-3">
                      <span className="text-[#D5F45B]">СЛОТ #{String(index + 1).padStart(2, '0')}</span>
                      <Clock className="w-3 h-3 text-[#B0B5AD] group-hover:text-[#D5F45B] transition-colors" />
                    </div>
                    <h5 className="font-display font-bold text-sm text-[#F2F1E9] mb-1.5 leading-snug">
                      {slot.title}
                    </h5>
                    <p className="text-xs text-[#B0B5AD] line-clamp-2">
                      {slot.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#222623] flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[#D5F45B]">[В ПРОИЗВОДСТВЕ]</span>
                    <span className="font-mono text-[#B0B5AD]">2026</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
