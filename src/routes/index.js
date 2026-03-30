// backend/src/routes/index.js дотор түр нэмэх debug endpoint
// GET /api/debug/car — apicars.info-ийн нэг машины бүтцийг харах

const express = require('express');
const carRoutes = require('./carRoutes');
const adminRoutes = require('./adminRoutes');
const axios = require('axios');

const router = express.Router();

// ── DEBUG (хөгжүүлэлтийн үед л ашиглах) ───────────────────────────────────
router.get('/debug/car', async (req, res) => {
  try {
    const response = await axios.get('https://apicars.info/api/cars?limit=1', {
      headers: { 'X-API-Key': process.env.APICARS_API_KEY },
      timeout: 10000,
    });
    // Нэг машины бүх field-ийг харуулах
    const raw = response.data;
    const cars = raw?.data?.cars || raw?.cars || raw?.data || [];
    const firstCar = Array.isArray(cars) ? cars[0] : cars;
    res.json({
      responseKeys: Object.keys(raw),
      dataKeys: raw.data ? Object.keys(raw.data) : 'no data key',
      firstCar,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use('/cars', carRoutes);
router.use('/admin', adminRoutes);

module.exports = router;