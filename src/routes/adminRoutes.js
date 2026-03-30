const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const {
  getPriceConfig,
  updatePriceConfig,
} = require('../controllers/admin/adminPriceConfigController');
const {
  getTaxConfig,
  updateTaxConfig,
} = require('../controllers/admin/adminTaxConfigController');

const router = express.Router();

// GET  /api/admin/price-config  — одоогийн үнийн тохиргоо харах
router.get('/price-config', asyncHandler(getPriceConfig));

// PUT  /api/admin/price-config  — үнийн тохиргоо шинэчлэх
router.put('/price-config', asyncHandler(updatePriceConfig));

// GET  /api/admin/tax-config  — татварын хүснэгт харах
router.get('/tax-config', asyncHandler(getTaxConfig));

// PUT  /api/admin/tax-config  — татварын хүснэгт шинэчлэх
router.put('/tax-config', asyncHandler(updateTaxConfig));

module.exports = router;