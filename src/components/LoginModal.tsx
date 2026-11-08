import React, { useState } from 'react';
import { X, Lock, ShieldCheck, LogOut, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';
import { authService, ADMIN_EMAIL } from '../services/auth';
import { AuthUser } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLoginSuccess: (user: AuthUser) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setErrorMessage('Пожалуйста, введите ваш email');
      return;
    }

    const res = authService.login(email, passkey);
    if (!res.success) {
      setErrorMessage(res.error || 'Ошибка входа');
      return;
    }

    if (res.user) {
      onLoginSuccess(res.user);
      if (res.user.isAdmin) {
        onClose();
      } else {
        setInfoMessage(res.error || 'Вы вошли как обычный пользователь без прав администратора.');
      }
    }
  };

  const handleQuickAdminFill = () => {
    setEmail(ADMIN_EMAIL);
    setPasskey('siluet2026');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141615]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#1E211F] border border-[#363B35] rounded-[2px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#363B35] bg-[#141615]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D5F45B]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#F2F1E9]">
              АВТОРИЗАЦИЯ // SILUET
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1E211F] border border-[#363B35] rounded-none transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {currentUser ? (
            /* Logged in state */
            <div className="space-y-5">
              <div className="p-4 bg-[#141615] border border-[#363B35] space-y-2">
                <div className="flex items-center gap-2">
                  {currentUser.isAdmin ? (
                    <ShieldCheck className="w-5 h-5 text-[#D5F45B]" />
                  ) : (
                    <UserCheck className="w-5 h-5 text-[#B0B5AD]" />
                  )}
                  <span className="font-display font-bold text-sm text-[#F2F1E9]">
                    {currentUser.isAdmin ? 'Режим администратора активен' : 'Обычный просмотр'}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#B0B5AD]">
                  Аккаунт: <span className="text-[#F2F1E9]">{currentUser.email}</span>
                </div>
                <div className="text-[11px] text-[#B0B5AD]">
                  {currentUser.isAdmin
                    ? 'У вас есть полные права на управление проектами, настройками Hero и просмотр заявок.'
                    : 'С этого аккаунта доступен только обычный сайт без прав администрации.'}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#363B35]"
                >
                  Вернуться на сайт
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-300 border border-red-900/60 hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-[#F2F1E9] mb-1">
                  Вход в аккаунт
                </h3>
                <p className="text-xs text-[#B0B5AD] leading-relaxed">
                  Полный доступ к панели управления предоставляется исключительно для аккаунта <span className="text-[#D5F45B] font-mono">{ADMIN_EMAIL}</span>. Вход без аккаунта или с любого другого открывает обычный сайт без прав администрации.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 text-xs text-red-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {infoMessage && (
                <div className="p-3 bg-[#141615] border border-[#363B35] text-xs text-[#B0B5AD]">
                  {infoMessage}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                    Email аккаунта *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleQuickAdminFill}
                    className="mt-1.5 text-[11px] font-mono text-[#D5F45B] hover:underline block"
                  >
                    Вставить мой аккаунт ({ADMIN_EMAIL})
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#B0B5AD] uppercase mb-1">
                    Пароль администратора
                  </label>
                  <input
                    type="password"
                    placeholder="Пароль (по умолчанию: siluet2026)"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141615] border border-[#363B35] focus:border-[#D5F45B] focus:outline-none text-sm text-[#F2F1E9] rounded-none font-mono"
                  />
                  <div className="mt-1 text-[10px] text-[#B0B5AD]/70 font-mono">
                    Для вашего аккаунта установлен пароль по умолчанию: siluet2026
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#363B35]"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all rounded-none"
                >
                  <span>Войти в аккаунт</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#141615]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
