import React, { useState } from 'react';
import { SlidersHorizontal, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthUser } from '../types';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
  demoMode: boolean;
  currentUser?: AuthUser | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenInquiry, 
  onOpenAdmin, 
  demoMode,
  currentUser 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0e100f]/85 backdrop-blur-xl border-b border-[#292e28] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element with film cut motif & ambient glow) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group text-[#F2F1E9] focus:outline-none"
          aria-label="Siluet видеомонтаж главная"
        >
          <div className="relative flex items-center gap-2">
            {/* Film splice mark icon with animated pulse on hover */}
            <div className="relative w-7 h-7 bg-[#171a18] border border-[#363B35] group-hover:border-[#D5F45B] flex items-center justify-center transition-colors duration-200">
              <svg 
                className="w-4 h-4 text-[#D5F45B] transition-transform duration-300 group-hover:rotate-45" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M9 12L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black tracking-widest text-xl text-[#F2F1E9] uppercase leading-none group-hover:text-[#D5F45B] transition-colors">
                SILUET
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#B0B5AD] uppercase mt-0.5">
                Video Edit &amp; Sound
              </span>
            </div>
          </div>

          {demoMode && (
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#D5F45B] bg-[#D5F45B]/10 border border-[#D5F45B]/30 px-2 py-0.5 uppercase tracking-wider ml-1">
              Demo Mode
            </span>
          )}

          {currentUser?.isAdmin && (
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-[#4FF4D2] bg-[#4FF4D2]/10 border border-[#4FF4D2]/30 px-2 py-0.5 uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Admin
            </span>
          )}
        </a>

        {/* Zone 2: Clean Nav Links with Interactive Hover */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#B0B5AD]">
          {[
            { href: '#works', label: 'Работы' },
            { href: '#services', label: 'Услуги' },
            { href: '#process', label: 'Процесс' },
            { href: '#contact', label: 'Контакты' },
          ].map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="relative py-1 text-sm font-medium hover:text-[#F2F1E9] transition-colors duration-200 group whitespace-nowrap"
            >
              <span>{item.label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#D5F45B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Admin Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            className={`p-2.5 rounded-none border transition-all duration-200 ${
              currentUser?.isAdmin
                ? 'text-[#4FF4D2] bg-[#4FF4D2]/10 border-[#4FF4D2]/40 shadow-[0_0_12px_rgba(79,244,210,0.2)]'
                : 'text-[#B0B5AD] hover:text-[#D5F45B] bg-[#141615] hover:bg-[#1a1d1b] border-[#2e332d] hover:border-[#D5F45B]/60'
            }`}
            title="Управление портфолио (Админка)"
            aria-label="Открыть панель управления"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInquiry}
            className="relative group overflow-hidden px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(213,244,91,0.25)] hover:shadow-[0_0_30px_rgba(213,244,91,0.45)]"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative flex items-center gap-2">
              <span>Заказать монтаж</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-[#F2F1E9] bg-[#171a18] border border-[#2e332d] hover:border-[#D5F45B] transition-colors"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#101211] border-b border-[#2e332d] px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 text-base font-display font-semibold text-[#F2F1E9]">
              {[
                { href: '#works', label: '01 / Работы' },
                { href: '#services', label: '02 / Услуги' },
                { href: '#process', label: '03 / Процесс' },
                { href: '#contact', label: '04 / Контакты' },
              ].map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-1 hover:text-[#D5F45B] transition-colors flex items-center justify-between border-b border-[#222623] pb-2 text-sm tracking-wider uppercase"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B0B5AD]" />
                </a>
              ))}
            </nav>

            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] shadow-lg"
              >
                <span>Заказать монтаж</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] bg-[#171a18] border border-[#2e332d]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Панель управления портфолио</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
