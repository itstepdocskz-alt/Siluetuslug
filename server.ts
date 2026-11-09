import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// --- SECURE SERVER-SIDE AUTHENTICATION ---
// Authorized admin account
export const ADMIN_EMAIL = 'mansurdastanuly111@gmail.com';

// Cryptographically secured PBKDF2 hash of the admin password
// Plaintext password is NEVER kept in source code or sent to client
const AUTH_CREDENTIALS = {
  salt: 'c93a9159ea62b5c04a108c42d82011bf',
  hash: '4f97ddbdd19d5a7c377881c9963d3c704d216abfc5063bf9fa7c20b80d5198fcca7be708db79a8c563689dcb7311dc2ecc6a235d8efae608f13c3e7400dacf44',
  iterations: 100000,
  digest: 'sha512',
};

// In-memory active session tokens store (token -> session data)
interface ServerSession {
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: number;
  expiresAt: number;
}
const activeSessions = new Map<string, ServerSession>();

// Verify password with constant-time buffer comparison to prevent timing attacks
function verifyAdminPassword(passwordAttempt: string): boolean {
  if (!passwordAttempt || typeof passwordAttempt !== 'string') return false;
  try {
    const derivedKey = crypto.pbkdf2Sync(
      passwordAttempt,
      AUTH_CREDENTIALS.salt,
      AUTH_CREDENTIALS.iterations,
      64,
      AUTH_CREDENTIALS.digest
    );
    const expectedKey = Buffer.from(AUTH_CREDENTIALS.hash, 'hex');
    if (derivedKey.length !== expectedKey.length) return false;
    return crypto.timingSafeEqual(derivedKey, expectedKey);
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

// Auth API Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, error: 'Введите email' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const isAdminTarget = cleanEmail === ADMIN_EMAIL.toLowerCase();

  if (isAdminTarget) {
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({
        success: false,
        error: 'Неверный пароль администратора',
      });
    }

    // Generate secure random session token
    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    const session: ServerSession = {
      email: cleanEmail,
      name: 'Мансур / Siluet',
      isAdmin: true,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000, // 7 days validity
    };
    activeSessions.set(token, session);

    return res.json({
      success: true,
      token,
      user: {
        email: cleanEmail,
        name: 'Мансур / Siluet',
        isAdmin: true,
        loggedInAt: new Date().toISOString(),
      },
    });
  }

  // Non-admin guest account (read-only)
  return res.status(403).json({
    success: false,
    error: 'Доступ к панели управления разрешен только для авторизованного аккаунта студии.',
  });
});

app.get('/api/auth/session', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.slice(7).trim();
  const session = activeSessions.get(token);

  if (!session || Date.now() > session.expiresAt) {
    if (session) activeSessions.delete(token);
    return res.json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    user: {
      email: session.email,
      name: session.name,
      isAdmin: session.isAdmin,
      loggedInAt: new Date(session.createdAt).toISOString(),
    },
  });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    activeSessions.delete(token);
  }
  return res.json({ success: true });
});

// Vite middleware in dev, or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Siluet Studio Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
