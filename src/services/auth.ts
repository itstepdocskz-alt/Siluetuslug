import { AuthUser } from '../types';

export const ADMIN_EMAIL = 'mansurdastanuly111@gmail.com';
const TOKEN_STORAGE_KEY = 'siluet_auth_token_v1';
const USER_STORAGE_KEY = 'siluet_auth_user_v1';

export const authService = {
  getAdminEmail(): string {
    return ADMIN_EMAIL;
  },

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  getCurrentUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      if (data) {
        const user: AuthUser = JSON.parse(data);
        user.isAdmin = user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
        return user;
      }
    } catch (e) {
      console.warn('Failed to parse current user session:', e);
    }
    return null;
  },

  async login(email: string, passwordAttempt: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: passwordAttempt }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Ошибка авторизации. Проверьте введенные данные.',
        };
      }

      if (data.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      }
      if (data.user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      console.error('Server login request failed:', err);
      return {
        success: false,
        error: 'Не удалось связаться с сервером авторизации. Попробуйте еще раз.',
      };
    }
  },

  async verifySession(): Promise<AuthUser | null> {
    const token = authService.getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/session', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
          return data.user;
        }
      }
    } catch (e) {
      console.warn('Session verification error:', e);
    }

    // Invalid session
    authService.logout();
    return null;
  },

  async logout(): Promise<void> {
    const token = authService.getToken();
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.warn('Logout server notification failed:', e);
    } finally {
      try {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch (err) {
        console.error('Failed to clear local token:', err);
      }
    }
  },

  isAdmin(user: AuthUser | null): boolean {
    if (!user) return false;
    return user.isAdmin && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  },
};
