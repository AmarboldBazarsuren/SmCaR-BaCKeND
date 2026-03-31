// backend/src/routes/uploadRoutes.js
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// uploads/ хавтас байгаа эсэх шалгаж үүсгэх
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Зөвхөн зураг файл upload хийнэ үү'));
  },
});

// POST /api/upload/banner  — ганц зураг (banner-д)
router.post('/banner', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Файл олдсонгүй' });
  }
  res.json({ success: true, imageUrl: `/api/uploads/${req.file.filename}` });
});

// POST /api/upload/images  — олон зураг нэг дор (listing-д)
router.post('/images', requireAdmin, upload.array('images', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'Файл олдсонгүй' });
  }
  const imageUrls = req.files.map((f) => `/api/uploads/${f.filename}`);
  res.json({ success: true, imageUrls });
});

module.exports = router;