import React, { useState } from 'react';
import { X, Lock, ShieldCheck, LogOut, ArrowRight, UserCheck, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Пожалуйста, введите ваш email');
      return;
    }
    if (!password) {
      setErrorMessage('Введите пароль');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Неверный email или пароль');
        setIsLoading(false);
        return;
      }

      if (res.user) {
        onLoginSuccess(res.user);
        setIsLoading(false);
        onClose();
      }
    } catch {
      setErrorMessage('Произошла непредвиденная ошибка при входе');
      setIsLoading(false);
    }
  };

  const handleQuickFillEmail = () => {
    setEmail(ADMIN_EMAIL);
    setErrorMessage(null);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0c0b]/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#161817] border border-[#2e332d] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D5F45B] to-transparent opacity-80" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e332d] bg-[#121413]">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 bg-[#D5F45B] rotate-45" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B0B5AD]">
                АВТОРИЗАЦИЯ // СТУДИЯ
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#B0B5AD] hover:text-[#F2F1E9] hover:bg-[#1E211F] border border-transparent hover:border-[#363B35] transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-7">
            {currentUser ? (
              /* Already logged in session card */
              <div className="space-y-6">
                <div className="p-5 bg-[#121413] border border-[#2e332d] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#D5F45B]/10 border border-[#D5F45B]/30 flex items-center justify-center text-[#D5F45B]">
                      {currentUser.isAdmin ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <UserCheck className="w-5 h-5 text-[#B0B5AD]" />
                      )}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-[#F2F1E9]">
                        {currentUser.isAdmin ? 'Администратор студии' : 'Сессия активна'}
                      </div>
                      <div className="text-xs font-mono text-[#D5F45B]">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#B0B5AD] leading-relaxed pt-1">
                    {currentUser.isAdmin
                      ? 'Вам доступен полный контроль над проектами, порядком работ, скрытием демонстрационных слотов и заявками клиентов.'
                      : 'Доступ открыт в режиме просмотра.'}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#2e332d] hover:border-[#363B35] transition-colors"
                  >
                    Закрыть окно
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 border border-red-950/60 bg-red-950/20 hover:bg-red-950/40 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Secure Admin Login Form */
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F2F1E9] mb-1">
                    Вход в управление
                  </h3>
                  <p className="text-xs text-[#B0B5AD]">
                    Панель администратора Siluet Studio.
                  </p>
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/40 border border-red-900/60 text-xs text-red-300 flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase tracking-wider">
                        Email аккаунта *
                      </label>
                      <button
                        type="button"
                        onClick={handleQuickFillEmail}
                        className="text-[10px] font-mono text-[#D5F45B] hover:underline"
                      >
                        Заполнить мой email
                      </button>
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#101211] border border-[#2e332d] focus:border-[#D5F45B] focus:ring-1 focus:ring-[#D5F45B]/40 focus:outline-none text-sm text-[#F2F1E9] font-mono transition-all"
                    />
                  </div>

                  {/* Password Field - Zero Hints */}
                  <div>
                    <label className="block text-[11px] font-mono text-[#B0B5AD] uppercase tracking-wider mb-1.5">
                      Пароль *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 bg-[#101211] border border-[#2e332d] focus:border-[#D5F45B] focus:ring-1 focus:ring-[#D5F45B]/40 focus:outline-none text-sm text-[#F2F1E9] font-mono transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B5AD] hover:text-[#F2F1E9]"
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#2e332d]">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs text-[#B0B5AD] hover:text-[#F2F1E9] border border-[#2e332d] transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141615] bg-[#D5F45B] hover:bg-[#c6e64f] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#141615]" />
                        <span>Проверка...</span>
                      </>
                    ) : (
                      <>
                        <span>Войти</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#141615]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
