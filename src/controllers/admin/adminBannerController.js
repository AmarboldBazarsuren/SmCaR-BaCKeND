const Banner = require('../../models/Banner');

/** GET /api/banners  — public, зөвхөн идэвхтэй баннерүүд */
const getActiveBanners = async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: banners });
};

/** GET /api/admin/banners  — admin, бүгд */
const getAllBanners = async (req, res) => {
  const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: banners });
};

/** POST /api/admin/banners */
const createBanner = async (req, res) => {
  const { title, subtitle, imageUrl, linkUrl, buttonText, isActive, order } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Гарчиг болон зургийн URL заавал шаардлагатай' });
  }
  const banner = await Banner.create({ title, subtitle, imageUrl, linkUrl, buttonText, isActive, order });
  res.status(201).json({ success: true, data: banner });
};

/** PUT /api/admin/banners/:id */
const updateBanner = async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!banner) return res.status(404).json({ success: false, message: 'Баннер олдсонгүй' });
  res.json({ success: true, data: banner });
};

/** DELETE /api/admin/banners/:id */
const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = { getActiveBanners, getAllBanners, createBanner, updateBanner, deleteBanner };