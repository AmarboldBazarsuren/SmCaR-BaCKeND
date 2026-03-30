const { fetchCarList } = require('../services/cars/carListService');

/**
 * GET /api/cars
 * Машины жагсаалт авах (filter, pagination, sort дэмжинэ)
 *
 * Query params: brand, model, yearFrom, yearTo, priceFrom, priceTo,
 *               minMileage, maxMileage, fuelType, transmission,
 *               sortBy, sortOrder, page, limit
 */
const getCars = async (req, res) => {
  const data = await fetchCarList(req.query);

  res.json({
    success: true,
    ...data,
  });
};

module.exports = { getCars };