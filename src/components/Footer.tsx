import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  return (
    <footer className="py-12 bg-[#141615] text-[#B0B5AD] border-t border-[#363B35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-xl tracking-widest text-[#F2F1E9] uppercase">
              SILUET
            </span>
            <span className="text-[#363B35]">/</span>
            <span className="text-xs font-mono text-[#B0B5AD]">
              ВИДЕОМОНТАЖ &amp; САУНД
            </span>
          </div>

          {/* Clean Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
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
              className="text-[#D5F45B] hover:underline"
            >
              Telegram
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs text-[#B0B5AD] hover:text-[#D5F45B] transition-colors"
              title="Открыть админ-панель Siluet"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Управление</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-[#363B35]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#B0B5AD]/70">
          <div>
            © {new Date().getFullYear()} Siluet. Независимый видеомонтаж для блогеров и брендов.
          </div>
          <div className="font-mono">
            Премиальный ритмический монтаж
          </div>
        </div>
      </div>
    </footer>
  );
};
