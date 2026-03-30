const express = require('express');
const carRoutes = require('./carRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/cars', carRoutes);
router.use('/admin', adminRoutes);

module.exports = router;