import React from 'react';
import { Send, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types';

interface ContactSectionProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenInquiry }) => {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden bg-[#0c0e0d] border-b border-[#2e332d]">
      
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[650px] h-[450px] bg-[#D5F45B]/6 rounded-full blur-[160px]" />
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'linear-gradient(#363B35 1px, transparent 1px), linear-gradient(90deg, #363B35 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {/* Overline */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-[1.5px] bg-[#D5F45B]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#B0B5AD]">
              04 / СВЯЗЬ И ОБСУЖДЕНИЕ
            </span>
          </div>

          {/* Huge Main Phrase with Gradient */}
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.04] tracking-tight text-[#F2F1E9] mb-8 text-balance">
            Ваши кадры. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F45B] via-[#c6e64f] to-[#4FF4D2]">
              Наша следующая история.
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-[#B0B5AD] mb-12 max-w-2xl font-normal leading-relaxed">
            Расскажите о задаче — обсудим формат, материалы и монтаж.
          </p>

          {/* Buttons: Telegram & Express Brief */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={config.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all duration-200 shadow-[0_0_30px_rgba(213,244,91,0.35)] hover:shadow-[0_0_45px_rgba(213,244,91,0.55)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <Send className="w-4 h-4 fill-current text-[#141615]" />
              <span className="relative">Написать в Telegram</span>
            </a>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F2F1E9] bg-[#161817] border border-[#2e332d] hover:border-[#D5F45B]/80 hover:bg-[#1a1d1b] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(213,244,91,0.15)] group"
            >
              <span>Заполнить экспресс-бриф</span>
              <ArrowUpRight className="w-4 h-4 text-[#B0B5AD] group-hover:text-[#D5F45B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Contact Details Bar */}
          <div className="mt-16 pt-8 border-t border-[#2e332d] flex flex-wrap items-center justify-between gap-6 text-xs text-[#B0B5AD]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#171a18] border border-[#2e332d] flex items-center justify-center text-[#D5F45B]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#B0B5AD] mr-2">Прямая почта:</span>
                <a 
                  href={`mailto:${config.email}`} 
                  className="text-[#F2F1E9] font-mono hover:text-[#D5F45B] transition-colors underline"
                >
                  {config.email}
                </a>
              </div>
            </div>

            <div className="font-mono text-[11px] text-[#B0B5AD]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D5F45B] animate-pulse" />
              <span>Ответ в течение 1–2 часов в рабочее время</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
