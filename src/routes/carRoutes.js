const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { getCars } = require('../controllers/carListController');
const { getCarById, calcPrice } = require('../controllers/carDetailController');

const router = express.Router();

// GET /api/cars  — жагсаалт (filter, sort, pagination)
router.get('/', asyncHandler(getCars));

// GET /api/cars/:id  — нэг машины дэлгэрэнгүй + үнийн задаргаа
router.get('/:id', asyncHandler(getCarById));

// POST /api/cars/price-calc  — гараар үнэ бодох
router.post('/price-calc', asyncHandler(calcPrice));

module.exports = router;