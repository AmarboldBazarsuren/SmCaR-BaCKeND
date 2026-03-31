// backend/src/controllers/admin/adminCarListingController.js
const CarListing = require('../../models/CarListing');

/** GET /api/listings  — public */
const getActiveListings = async (req, res) => {
  const { brand, limit = 20 } = req.query;
  const query = { isActive: true };
  if (brand) query.brand = brand;
  const listings = await CarListing.find(query)
    .sort({ order: 1, createdAt: -1 })
    .limit(Number(limit));
  res.json({ success: true, data: listings });
};

/** GET /api/listings/:id  — public, нэг зар */
const getListingById = async (req, res) => {
  const listing = await CarListing.findById(req.params.id);
  if (!listing) return res.status(404).json({ success: false, message: 'Зар олдсонгүй' });
  res.json({ success: true, data: listing });
};

/** GET /api/admin/listings  — admin */
const getAllListings = async (req, res) => {
  const listings = await CarListing.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: listings });
};

/** POST /api/admin/listings */
const createListing = async (req, res) => {
  const {
    title, brand, model, year, mileage, fuelType, transmission,
    cc, color, krwPrice, description, images, linkUrl, isActive, order,
  } = req.body;

  if (!title || !brand) {
    return res.status(400).json({ success: false, message: 'Гарчиг болон брэнд шаардлагатай' });
  }

  // images нь array эсвэл JSON string байж болно
  let imagesArr = [];
  if (Array.isArray(images)) imagesArr = images;
  else if (typeof images === 'string') {
    try { imagesArr = JSON.parse(images); } catch { imagesArr = images ? [images] : []; }
  }

  const listing = await CarListing.create({
    title, brand, model, year, mileage, fuelType, transmission,
    cc, color, krwPrice, description,
    images: imagesArr,
    linkUrl, isActive, order,
  });
  res.status(201).json({ success: true, data: listing });
};

/** PUT /api/admin/listings/:id */
const updateListing = async (req, res) => {
  // images талбарыг мөн parse хийх
  if (req.body.images && typeof req.body.images === 'string') {
    try { req.body.images = JSON.parse(req.body.images); } catch { /* ignore */ }
  }
  const listing = await CarListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!listing) return res.status(404).json({ success: false, message: 'Зар олдсонгүй' });
  res.json({ success: true, data: listing });
};

/** DELETE /api/admin/listings/:id */
const deleteListing = async (req, res) => {
  await CarListing.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = {
  getActiveListings, getListingById,
  getAllListings, createListing, updateListing, deleteListing,
};