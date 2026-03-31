// backend/src/routes/index.js
const express = require('express');
const path    = require('path');
const carRoutes    = require('./carRoutes');
const adminRoutes  = require('./adminRoutes');
const uploadRoutes = require('./uploadRoutes');
const asyncHandler = require('../middleware/asyncHandler');
const { getActiveBanners }           = require('../controllers/admin/adminBannerController');
const { getActiveListings, getListingById } = require('../controllers/admin/adminCarListingController');
const axios = require('axios');

const router = express.Router();

// ── Static: upload хийсэн зургуудыг серв хийх
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ── Public endpoints
router.get('/banners',       asyncHandler(getActiveBanners));
router.get('/listings',      asyncHandler(getActiveListings));   // жагсаалт
router.get('/listings/:id',  asyncHandler(getListingById));      // нэг зар

// ── Upload
router.use('/upload', uploadRoutes);

// ── Cars & Admin
router.use('/cars',  carRoutes);
router.use('/admin', adminRoutes);

// ── DEBUG
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

module.exports = router;