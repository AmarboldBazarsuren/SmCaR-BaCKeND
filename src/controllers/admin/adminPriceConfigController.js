const PriceConfig = require('../../models/PriceConfig');

/**
 * GET /api/admin/price-config
 * Одоогийн үнийн тохиргоо харах
 */
const getPriceConfig = async (req, res) => {
  const config = await PriceConfig.getActive();
  res.json({ success: true, data: config });
};

/**
 * PUT /api/admin/price-config
 * Үнийн тохиргоо шинэчлэх
 * Body: { krwToMntRate, serviceFee, shippingCost, customsDutyRate, vatRate, ... }
 */
const updatePriceConfig = async (req, res) => {
  const allowedFields = [
    'krwToMntRate', 'serviceFee', 'shippingCost',
    'customsDutyRate', 'vatRate',
    'advancePaymentRate', 'remainingPaymentRate',
    'name', 'updatedBy',
  ];

  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const config = await PriceConfig.findOneAndUpdate(
    { isActive: true },
    { $set: updates },
    { new: true, upsert: true }
  );

  res.json({ success: true, data: config });
};

module.exports = { getPriceConfig, updatePriceConfig };