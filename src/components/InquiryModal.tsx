import React, { useState } from 'react';
import { X, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141615]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#1E211F] border border-[#363B35] rounded-[2px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#363B35] bg-[#141615]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D5F45B] rounded-none" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#B0B5AD]">
              SILUET // ЭКСПРЕСС-БРИФ
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1E211F] border border-[#363B35] rounded-none transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#D5F45B] mx-auto" />
            <h3 className="font-display font-black text-2xl text-[#F2F1E9]">
              Бриф отправлен
            </h3>
            <p className="text-sm text-[#B0B5AD] max-w-md mx-auto leading-relaxed">
              Спасибо за информацию о задаче! Я изучу материалы и свяжусь с вами в Telegram или по почте в ближайшее время.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] rounded-none"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Написать сразу в Telegram</span>
              </a>
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-3 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#363B35] rounded-none"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <h3 className="font-display font-bold text-xl text-[#F2F1E9] mb-1">
                Обсудить проект
              </h3>
              <p className="text-xs text-[#B0B5AD]">
                Заполните основные детали, и я вернусь с оценкой формата и сроков.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1.5">
                  Ваше имя или название канала/бренда *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Артем / Канал 'Новые горизонты'"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1.5">
                  Контакт для связи (Telegram / Email / Телефон) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username в Telegram или email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1.5">
                  Формат проекта
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none"
                >
                  <option value="YouTube-выпуск">YouTube-выпуск / шоу / подкаст</option>
                  <option value="Серия Reels / Shorts">Пакет вертикальных Reels / Shorts / TikTok</option>
                  <option value="Реклама и промо">Рекламное промо / презентация продукта</option>
                  <option value="Саунд-дизайн и цвет">Саунд-дизайн и цветокоррекция</option>
                  <option value="Другое">Другая задача монтажа</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1.5">
                  Ссылка на исходники или референсы (опционально)
                </label>
                <input
                  type="url"
                  placeholder="Google Drive, Dropbox, Яндекс Диск..."
                  value={materialLink}
                  onChange={(e) => setMaterialLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1.5">
                  Пожелания к задаче, дедлайн, хронометраж
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишите хронометраж, примерные сроки и то, что важно в монтаже..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#B0B5AD] hover:text-[#D5F45B] inline-flex items-center gap-1"
              >
                <span>Или написать сразу в Telegram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all rounded-none"
              >
                Отправить бриф
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
