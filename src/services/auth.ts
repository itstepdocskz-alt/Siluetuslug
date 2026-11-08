import { AuthUser } from '../types';

export const ADMIN_EMAIL = 'mansurdastanuly111@gmail.com';
const AUTH_STORAGE_KEY = 'siluet_auth_session_v1';
const PASSKEY_STORAGE_KEY = 'siluet_admin_passkey_v1';
const DEFAULT_PASSKEY = 'siluet2026';

export const authService = {
  getAdminEmail(): string {
    return ADMIN_EMAIL;
  },

  getCurrentUser(): AuthUser | null {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (data) {
        const parsed: AuthUser = JSON.parse(data);
        // Double check isAdmin logic with the authorized admin email
        parsed.isAdmin = parsed.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse auth user session:', e);
    }
    return null;
  },

  getStoredPasskey(): string {
    return localStorage.getItem(PASSKEY_STORAGE_KEY) || DEFAULT_PASSKEY;
  },

  setStoredPasskey(newPasskey: string): void {
    localStorage.setItem(PASSKEY_STORAGE_KEY, newPasskey);
  },

  login(email: string, passkey?: string): { success: boolean; user?: AuthUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminTarget = cleanEmail === ADMIN_EMAIL.toLowerCase();

    if (isAdminTarget) {
      const requiredPasskey = authService.getStoredPasskey();
      // Verify passkey if provided, allow default passkeys for convenience
      if (passkey && passkey !== requiredPasskey && passkey !== '2026' && passkey !== 'admin' && passkey !== DEFAULT_PASSKEY) {
        return {
          success: false,
          error: 'Неверный пароль администратора. Попробуйте пароль по умолчанию: siluet2026',
        };
      }

      const adminUser: AuthUser = {
        email: cleanEmail,
        name: 'Мансур / Siluet',
        isAdmin: true,
        loggedInAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      } catch (e) {
        console.error('Failed to save auth session:', e);
      }

      return { success: true, user: adminUser };
    }

    // Any other account: regular viewer without admin permissions
    const regularUser: AuthUser = {
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      isAdmin: false,
      loggedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(regularUser));
    } catch (e) {
      console.error('Failed to save auth session:', e);
    }

    return { 
      success: true, 
      user: regularUser,
      error: 'Вы вошли как обычный пользователь без прав администратора. Доступ к админ-панели имеет только mansurdastanuly111@gmail.com.',
    };
  },

  logout(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear auth session:', e);
    }
  },

  isAdmin(user: AuthUser | null): boolean {
    if (!user) return false;
    return user.isAdmin && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  },
};
