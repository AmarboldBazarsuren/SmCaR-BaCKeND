const { createSession, invalidateToken } = require('../../middleware/adminAuth');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smcar2024';

/**
 * POST /api/admin/login
 */
const login = (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' });
  }
  const token = createSession();
  res.json({ success: true, token });
};

/**
 * POST /api/admin/logout
 */
const logout = (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (token) invalidateToken(token);
  res.json({ success: true });
};

/**
 * GET /api/admin/me
 */
const me = (req, res) => {
  res.json({ success: true, username: ADMIN_USERNAME });
};

module.exports = { login, logout, me };