import React, { useState } from 'react';
import { X, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../services/storage';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  telegramUrl: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, telegramUrl }) => {
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState('YouTube-выпуск');
  const [materialLink, setMaterialLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !contact.trim()) return;

    storage.addInquiry({
      clientName: clientName.trim(),
      contact: contact.trim(),
      projectType,
      materialLink: materialLink.trim() || undefined,
      notes: notes.trim(),
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setClientName('');
    setContact('');
    setMaterialLink('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a0c0b]/90 backdrop-blur-xl"
        onClick={handleResetAndClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#141615] border border-[#2e332d] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e332d] bg-[#0e100f]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#D5F45B] rotate-45" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#F2F1E9] font-bold">
                SILUET // ЭКСПРЕСС-БРИФ
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1a1d1b] border border-[#2e332d] transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          {submitted ? (
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#D5F45B]/10 border border-[#D5F45B]/30 flex items-center justify-center text-[#D5F45B] mx-auto shadow-[0_0_25px_rgba(213,244,91,0.25)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#F2F1E9]">
                Бриф успешно принят
              </h3>
              <p className="text-sm text-[#B0B5AD] max-w-md mx-auto leading-relaxed">
                Спасибо за информацию о задаче! Я ознакомлюсь с материалами и свяжусь с вами в Telegram или по почте в ближайшее время.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] shadow-lg"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>Написать сразу в Telegram</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-3.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#2e332d]"
                >
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F2F1E9] mb-1">
                  Обсудить задачу монтажа
                </h3>
                <p className="text-xs text-[#B0B5AD]">
                  Укажите ключевые детали проекта для быстрой оценки сроков и стоимости
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                    Ваше имя или название проекта *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Артем / Канал 'Новые горизонты'"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                    Контакт для связи (Telegram / Email) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@username в Telegram или email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                    Формат задачи
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9]"
                  >
                    <option value="YouTube-выпуск">YouTube-выпуск / шоу / подкаст</option>
                    <option value="Серия Reels / Shorts">Серия вертикальных Reels / Shorts / TikTok</option>
                    <option value="Реклама и промо">Имиджевая реклама / презентация продукта</option>
                    <option value="Саунд-дизайн и цвет">Саунд-дизайн и цветокоррекция</option>
                    <option value="Другое">Другая задача монтажа</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                    Ссылка на исходники или референсы (опционально)
                  </label>
                  <input
                    type="url"
                    placeholder="Google Drive, Dropbox, Яндекс Диск..."
                    value={materialLink}
                    onChange={(e) => setMaterialLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase mb-1.5">
                    Пожелания к ритму, дедлайн, хронометраж
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Опишите хронометраж, желаемые сроки и то, что важно в динамике..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e100f] border border-[#2e332d] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] resize-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#2e332d]">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B0B5AD] hover:text-[#D5F45B] inline-flex items-center gap-1 font-mono"
                >
                  <span>Или перейти сразу в Telegram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="submit"
                  className="px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(213,244,91,0.25)]"
                >
                  Отправить бриф
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
