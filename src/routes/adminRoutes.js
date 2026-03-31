const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { requireAdmin } = require('../middleware/adminAuth');
const { login, logout, me } = require('../controllers/admin/adminAuthController');
const { getPriceConfig, updatePriceConfig } = require('../controllers/admin/adminPriceConfigController');
const { getTaxConfig, updateTaxConfig } = require('../controllers/admin/adminTaxConfigController');
const {
  getAllBanners, createBanner, updateBanner, deleteBanner,
} = require('../controllers/admin/adminBannerController');

const router = express.Router();

// ── Auth (нэвтрэхэд token шаардлагагүй) ────────────────────────────────────
router.post('/login',  asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me',      requireAdmin, asyncHandler(me));

// ── Price config ────────────────────────────────────────────────────────────
router.get('/price-config', requireAdmin, asyncHandler(getPriceConfig));
router.put('/price-config', requireAdmin, asyncHandler(updatePriceConfig));

// ── Tax config ──────────────────────────────────────────────────────────────
router.get('/tax-config', requireAdmin, asyncHandler(getTaxConfig));
router.put('/tax-config', requireAdmin, asyncHandler(updateTaxConfig));

// ── Banners ─────────────────────────────────────────────────────────────────
router.get('/banners',        requireAdmin, asyncHandler(getAllBanners));
router.post('/banners',       requireAdmin, asyncHandler(createBanner));
router.put('/banners/:id',    requireAdmin, asyncHandler(updateBanner));
router.delete('/banners/:id', requireAdmin, asyncHandler(deleteBanner));

module.exports = router;