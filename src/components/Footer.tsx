import React from 'react';
import { SlidersHorizontal, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SiteConfig, AuthUser } from '../types';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
  currentUser?: AuthUser | null;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin, currentUser }) => {
  return (
    <footer className="py-16 bg-[#0a0c0b] text-[#B0B5AD] border-t border-[#2e332d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Brand mark with tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-2xl tracking-widest text-[#F2F1E9] uppercase">
                SILUET
              </span>
              <span className="text-[#363B35]">/</span>
              <span className="text-xs font-mono text-[#D5F45B] tracking-wider uppercase">
                ВИДЕОМОНТАЖ &amp; САУНД
              </span>
            </div>
            <p className="text-xs text-[#B0B5AD]/80 max-w-sm">
              Премиальный ритмический монтаж для YouTube, кинематографичных Reels и коммерческих проектов.
            </p>
          </div>

          {/* Clean Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#works" className="hover:text-[#F2F1E9] transition-colors">
              Работы
            </a>
            <a href="#services" className="hover:text-[#F2F1E9] transition-colors">
              Услуги
            </a>
            <a href="#process" className="hover:text-[#F2F1E9] transition-colors">
              Процесс
            </a>
            <a 
              href={config.telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#D5F45B] hover:underline inline-flex items-center gap-1"
            >
              <span>Telegram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border transition-colors ${
                currentUser?.isAdmin
                  ? 'border-[#4FF4D2]/40 text-[#4FF4D2] bg-[#4FF4D2]/10'
                  : 'border-[#2e332d] text-[#B0B5AD] hover:text-[#D5F45B] hover:border-[#D5F45B]/60'
              }`}
              title="Открыть админ-панель Siluet"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{currentUser?.isAdmin ? 'Управление (Admin)' : 'Управление'}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-[#1e211f] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B0B5AD]/60 font-mono">
          <div>
            © {new Date().getFullYear()} Siluet Studio. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span>DaVinci Resolve Studio · Premiere Pro</span>
            <span className="text-[#363B35]">·</span>
            <span className="text-[#D5F45B]">4K HDR &amp; 24 FPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
