const express = require('express');
const carRoutes = require('./carRoutes');
const adminRoutes = require('./adminRoutes');
const asyncHandler = require('../middleware/asyncHandler');
const { getActiveBanners } = require('../controllers/admin/adminBannerController');
const axios = require('axios');

const router = express.Router();

// ── Public endpoints ────────────────────────────────────────────────────────
// GET /api/banners — нүүр хуудасны carousel-д ашиглах
router.get('/banners', asyncHandler(getActiveBanners));

// ── DEBUG (хөгжүүлэлтийн үед) ───────────────────────────────────────────────
router.get('/debug/car', async (req, res) => {
  try {
    const response = await axios.get('https://apicars.info/api/cars?limit=1', {
      headers: { 'X-API-Key': process.env.APICARS_API_KEY },
      timeout: 10000,
    });
    const raw = response.data;
    const cars = raw?.data?.cars || raw?.cars || raw?.data || [];
    const firstCar = Array.isArray(cars) ? cars[0] : cars;
    res.json({ responseKeys: Object.keys(raw), firstCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use('/cars', carRoutes);
router.use('/admin', adminRoutes);

module.exports = router;