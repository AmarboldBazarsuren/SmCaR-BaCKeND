const TaxConfig = require('../../models/TaxConfig');

/**
 * GET /api/admin/tax-config
 * Татварын хүснэгт харах
 */
const getTaxConfig = async (req, res) => {
  const config = await TaxConfig.getActive();
  res.json({ success: true, data: config });
};

/**
 * PUT /api/admin/tax-config
 * Татварын мөр шинэчлэх
 * Body: { entries: [...] }
 */
const updateTaxConfig = async (req, res) => {
  const { entries, name, updatedBy } = req.body;

  const updates = {};
  if (entries)   updates.entries   = entries;
  if (name)      updates.name      = name;
  if (updatedBy) updates.updatedBy = updatedBy;

  const config = await TaxConfig.findOneAndUpdate(
    { isActive: true },
    { $set: updates },
    { new: true, upsert: true }
  );

  res.json({ success: true, data: config });
};

module.exports = { getTaxConfig, updateTaxConfig };