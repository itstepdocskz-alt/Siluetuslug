import React, { useState } from 'react';
import { ArrowUpRight, Play, Film, Clock, Sparkles } from 'lucide-react';
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

  return (
    <section id="works" className="py-24 border-b border-[#363B35] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#D5F45B] rounded-none inline-block" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
                01 / ИЗБРАННЫЕ РАБОТЫ
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F1E9] tracking-tight">
              Портфолио
            </h2>
          </div>

          {/* Format Filter Bar (Button controls, not pills) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1E211F] border border-[#363B35] rounded-none">
            {[
              { id: 'all', label: 'Все проекты' },
              { id: 'youtube', label: 'YouTube' },
              { id: 'reels', label: 'Reels 9:16' },
              { id: 'commercial', label: 'Реклама' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFormat(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none transition-all duration-180 ${
                  selectedFormat === tab.id
                    ? 'bg-[#141615] text-[#D5F45B] border border-[#363B35]'
                    : 'text-[#B0B5AD] hover:text-[#F2F1E9] border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State if no projects match */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center bg-[#1E211F] border border-[#363B35] rounded-none my-8">
            <Film className="w-8 h-8 text-[#B0B5AD] mx-auto mb-3 opacity-60" />
            <p className="text-base text-[#F2F1E9] font-medium">Нет опубликованных работ в этой категории</p>
            <p className="text-sm text-[#B0B5AD] mt-1">
              Напишите мне в Telegram, чтобы получить персональную подборку кейсов по вашей задаче.
            </p>
          </div>
        )}

        {/* 1. Featured Project (First Published Project - Large Showcase) */}
        {featuredProject && (
          <div className="mb-14">
            <div
              onClick={() => onSelectProject(featuredProject)}
              className="group cursor-pointer block bg-[#1E211F] border border-[#363B35] hover:border-[#B0B5AD] transition-all duration-300 rounded-[2px] overflow-hidden"
            >
              {/* Cover with internal scale on hover */}
              <div className="relative aspect-video sm:aspect-[21/9] w-full bg-[#141615] overflow-hidden">
                <img
                  src={featuredProject.coverUrl}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-350 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141615]/90 via-[#141615]/30 to-transparent" />

                {/* Duration & Year Badge (Clean metadata) */}
                <div className="absolute top-4 right-4 flex items-center gap-3 text-xs font-mono text-[#F2F1E9] bg-[#141615]/80 backdrop-blur-sm px-2.5 py-1 border border-[#363B35]">
                  <span className="text-[#D5F45B]">{featuredProject.duration}</span>
                  <span className="text-[#363B35]">/</span>
                  <span>{featuredProject.year}</span>
                </div>

                {/* "Смотреть проект" Prompt overlay on hover + touch visible */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-[#D5F45B] text-[#141615] font-bold text-xs uppercase tracking-wider rounded-none opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-xl">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Смотреть проект</span>
                  </div>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#D5F45B] uppercase block mb-1">
                    [ ИЗБРАННЫЙ КЕЙС ]
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#F2F1E9] tracking-tight group-hover:text-[#D5F45B] transition-colors duration-200">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>

              {/* Under cover: Name, Format, Role */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#363B35]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#B0B5AD]">
                  <span className="font-semibold text-[#F2F1E9]">{featuredProject.format}</span>
                  <span className="text-[#363B35]" aria-hidden="true">·</span>
                  <span>{featuredProject.role}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#D5F45B] group-hover:translate-x-1 transition-transform duration-200">
                  <span>Подробнее о монтаже</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Secondary Projects Grid (Preserving Vertical 9:16 Aspect Without Cropping!) */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-16">
            {secondaryProjects.map((project) => {
              const isVertical = project.aspectRatio === '9:16';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group cursor-pointer flex flex-col bg-[#1E211F] border border-[#363B35] hover:border-[#B0B5AD] transition-all duration-300 rounded-[2px] overflow-hidden"
                >
                  {/* Media Wrapper */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#141615] ${
                      isVertical ? 'aspect-[9/16] max-h-[520px]' : 'aspect-video'
                    }`}
                  >
                    <img
                      src={project.coverUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141615]/80 via-transparent to-transparent" />

                    {/* Metadata Header */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 text-[11px] font-mono text-[#F2F1E9] bg-[#141615]/80 backdrop-blur-sm px-2 py-0.5 border border-[#363B35]">
                      <span>{project.duration}</span>
                    </div>

                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 px-4 py-2 bg-[#D5F45B] text-[#141615] font-bold text-xs uppercase tracking-wider rounded-none opacity-90 sm:opacity-0 group-hover:opacity-100 transform sm:translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-md">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Смотреть проект</span>
                      </div>
                    </div>
                  </div>

                  {/* Under Cover: Title, Format, Role */}
                  <div className="p-5 flex-1 flex flex-col justify-between border-t border-[#363B35]">
                    <div>
                      <h4 className="font-display font-bold text-lg sm:text-xl text-[#F2F1E9] group-hover:text-[#D5F45B] transition-colors duration-200 mb-2 leading-snug">
                        {project.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#B0B5AD]">
                        <span className="font-medium text-[#F2F1E9]">{project.format}</span>
                        <span className="text-[#363B35]" aria-hidden="true">·</span>
                        <span>{project.role}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#363B35]/50 flex items-center justify-between text-xs text-[#B0B5AD]">
                      <span>{project.year}</span>
                      <span className="text-[#D5F45B] font-mono text-[11px] uppercase tracking-wider group-hover:underline">
                        Кейс →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Five Future Placeholder Slots (Rendered ONLY in Demo Mode) */}
        {demoMode && (
          <div className="pt-10 border-t border-[#363B35]/60">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D5F45B]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#B0B5AD]">
                  ДЕМОНСТРАЦИОННЫЙ РЕЖИМ // 5 МЕСТ ПОД БУДУЩИЕ РАБОТЫ
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#B0B5AD]">
                (скрывается при выключении демо-режима)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {demoPlaceholders.map((slot, index) => (
                <div
                  key={slot.id}
                  className="p-5 bg-[#141615] border border-dashed border-[#363B35] rounded-none flex flex-col justify-between hover:border-[#D5F45B]/60 transition-colors duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B0B5AD] mb-3">
                      <span>СЛОТ #{String(index + 1).padStart(2, '0')}</span>
                      <Clock className="w-3 h-3 text-[#D5F45B]" />
                    </div>
                    <h5 className="font-display font-bold text-sm text-[#F2F1E9] mb-1.5 leading-snug">
                      {slot.title}
                    </h5>
                    <p className="text-xs text-[#B0B5AD] line-clamp-2">
                      {slot.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#363B35]/50 flex items-center justify-between text-[11px] text-[#B0B5AD]">
                    <span className="font-mono text-[#D5F45B]">[В ПРОИЗВОДСТВЕ]</span>
                    <span>2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
