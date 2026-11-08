import React from 'react';
import { Send, ArrowUpRight, Mail } from 'lucide-react';
import { SiteConfig } from '../types';

interface ContactSectionProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenInquiry }) => {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#1E211F]/30 border-b border-[#363B35]">
      {/* Background ambient grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#363B35 1px, transparent 1px), linear-gradient(90deg, #363B35 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-[1.5px] bg-[#D5F45B]" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
              04 / СВЯЗЬ И ОБСУЖДЕНИЕ
            </span>
          </div>

          {/* Крупная фраза */}
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.08] tracking-tight text-[#F2F1E9] mb-8 text-balance">
            Ваши кадры. <br />
            <span className="text-[#D5F45B]">Наша следующая история.</span>
          </h2>

          {/* Описание под фразой */}
          <p className="text-lg sm:text-xl text-[#B0B5AD] mb-12 max-w-2xl font-normal leading-relaxed">
            Расскажите о задаче — обсудим формат, материалы и монтаж.
          </p>

          {/* Акцентная кнопка «Написать в Telegram» */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={config.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all duration-200 rounded-none shadow-md"
            >
              <Send className="w-4 h-4 fill-current text-[#141615]" />
              <span>Написать в Telegram</span>
            </a>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F2F1E9] bg-transparent border border-[#363B35] hover:border-[#B0B5AD] hover:bg-[#1E211F] active:scale-[0.98] transition-all duration-200 rounded-none"
            >
              <span>Заполнить экспресс-бриф</span>
              <ArrowUpRight className="w-4 h-4 text-[#B0B5AD]" />
            </button>
          </div>

          {/* Direct contact info */}
          <div className="mt-16 pt-8 border-t border-[#363B35] flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-[#B0B5AD]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D5F45B]" />
              <span>Почта:</span>
              <a href={`mailto:${config.email}`} className="text-[#F2F1E9] hover:text-[#D5F45B] transition-colors">
                {config.email}
              </a>
            </div>
            <div className="text-[11px] font-mono text-[#B0B5AD]/70">
              Ответ в течение нескольких часов в рабочее время
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
