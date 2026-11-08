import React, { useState } from 'react';
import { SlidersHorizontal, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
  demoMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenAdmin, demoMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#141615]/90 backdrop-blur-md border-b border-[#363B35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with subtle film cut motif) */}
        <a 
          href="#" 
          className="flex items-center gap-2 group text-[#F2F1E9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D5F45B]"
          aria-label="Siluet видеомонтаж главная"
        >
          <div className="flex items-center gap-1.5">
            {/* Film splice mark icon */}
            <svg 
              className="w-4 h-4 text-[#D5F45B] transition-transform duration-200 group-hover:scale-110" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
              <path d="M10 12L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-display font-black tracking-widest text-lg sm:text-xl text-[#F2F1E9] uppercase">
              SILUET
            </span>
          </div>
          {demoMode && (
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#B0B5AD] border border-[#363B35] px-1.5 py-0.5 rounded-none uppercase">
              Demo
            </span>
          )}
        </a>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#B0B5AD]">
          <a 
            href="#works" 
            className="hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap"
          >
            Работы
          </a>
          <a 
            href="#services" 
            className="hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap"
          >
            Услуги
          </a>
          <a 
            href="#process" 
            className="hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap"
          >
            Процесс
          </a>
          <a 
            href="#contact" 
            className="hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap"
          >
            Контакты
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Admin Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-[#B0B5AD] hover:text-[#D5F45B] hover:bg-[#1E211F] border border-[#363B35] rounded-none transition-colors duration-200"
            title="Управление портфолио (Админка)"
            aria-label="Открыть панель управления"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all duration-200 whitespace-nowrap rounded-none"
          >
            <span>Обсудить проект</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F2F1E9] hover:bg-[#1E211F] border border-[#363B35] rounded-none"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E211F] border-b border-[#363B35] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base text-[#F2F1E9]">
            <a 
              href="#works" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#D5F45B] transition-colors"
            >
              Работы
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#D5F45B] transition-colors"
            >
              Услуги
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#D5F45B] transition-colors"
            >
              Процесс
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#D5F45B] transition-colors"
            >
              Контакты
            </a>
          </nav>

          <div className="pt-4 border-t border-[#363B35] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#141615] bg-[#D5F45B] rounded-none"
            >
              <span>Обсудить проект</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#363B35] rounded-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Панель управления портфолио</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
