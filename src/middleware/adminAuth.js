// In-memory token store (production-д Redis хэрэглэх)
const activeTokens = new Map();
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 цаг

const generateToken = () => {
  const rand = Math.random().toString(36).slice(2) + Date.now().toString(36);
  return Buffer.from(rand).toString('base64');
};

const createSession = () => {
  const token = generateToken();
  activeTokens.set(token, Date.now());
  return token;
};

const isValidToken = (token) => {
  if (!token || !activeTokens.has(token)) return false;
  const ts = activeTokens.get(token);
  if (Date.now() - ts > TOKEN_TTL_MS) {
    activeTokens.delete(token);
    return false;
  }
  // Refresh
  activeTokens.set(token, Date.now());
  return true;
};

const invalidateToken = (token) => {
  activeTokens.delete(token);
};

// Express middleware
const requireAdmin = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!isValidToken(token)) {
    return res.status(401).json({ success: false, message: 'Нэвтрэх шаардлагатай' });
  }
  next();
};

module.exports = { requireAdmin, createSession, invalidateToken, isValidToken };