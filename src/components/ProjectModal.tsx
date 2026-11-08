import React, { useEffect, useState } from 'react';
import { X, Play, Pause, ExternalLink, ArrowUpRight, Volume2, Film } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenInquiry }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVertical = project.aspectRatio === '9:16';
  const hasEmbed = project.videoUrl && (project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') || project.videoUrl.includes('vimeo.com'));

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141615]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1E211F] border border-[#363B35] rounded-[2px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#363B35] bg-[#141615]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D5F45B] rounded-none" />
            <span className="text-xs font-mono tracking-wider text-[#B0B5AD] uppercase">
              {project.format}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1E211F] border border-[#363B35] rounded-none transition-colors"
            aria-label="Закрыть окно проекта"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Media Player Area */}
          <div className="relative w-full bg-[#141615] border border-[#363B35] overflow-hidden flex items-center justify-center">
            {hasEmbed && isPlaying ? (
              <div className="w-full aspect-video">
                <iframe
                  src={getEmbedUrl(project.videoUrl!)}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div 
                className={`relative w-full ${isVertical ? 'max-w-xs aspect-[9/16] mx-auto' : 'aspect-video'}`}
              >
                <img
                  src={project.coverUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Playhead Simulation */}
                <div className="absolute inset-0 bg-[#141615]/30 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-xs font-mono text-[#F2F1E9] bg-[#141615]/75 px-2.5 py-1 border border-[#363B35] self-start">
                    <span className="text-[#D5F45B]">{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-95 text-[#141615] flex items-center justify-center rounded-none shadow-xl transition-all duration-180"
                      aria-label="Воспроизвести проект"
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 fill-current" />
                      ) : (
                        <Play className="w-7 h-7 fill-current translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono text-[#B0B5AD] bg-[#141615]/80 px-3 py-1 border border-[#363B35]">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-[#D5F45B]" />
                      <span>MASTER AUDIO // STEREO</span>
                    </div>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F2F1E9] tracking-tight mb-3">
              {project.title}
            </h2>

            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#B0B5AD] mb-6">
              <span className="text-[#F2F1E9] font-medium">{project.format}</span>
              <span className="text-[#363B35]" aria-hidden="true">·</span>
              <span>{project.role}</span>
              {project.client && (
                <>
                  <span className="text-[#363B35]" aria-hidden="true">·</span>
                  <span>{project.client}</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm sm:text-base text-[#B0B5AD] leading-relaxed border-t border-[#363B35] pt-6">
              <p>{project.description}</p>
            </div>

            {/* Tools Used (Quiet clean unboxed tags) */}
            <div className="mt-6 pt-6 border-t border-[#363B35]">
              <span className="text-xs font-mono text-[#B0B5AD] tracking-wider uppercase block mb-3">
                Инструменты и софт проекта:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono text-[#F2F1E9] bg-[#141615] px-2.5 py-1 border border-[#363B35]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-[#363B35] bg-[#141615] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#B0B5AD]">
            Понравился монтаж этого кейса?
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all rounded-none"
          >
            <span>Обсудить похожий проект</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
