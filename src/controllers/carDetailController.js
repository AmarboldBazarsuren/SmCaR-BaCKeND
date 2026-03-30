const { getCarDetail, getPriceBreakdown } = require('../services/cars/carDetailService');

/**
 * GET /api/cars/:id
 * Нэг машины дэлгэрэнгүй + CC + үнийн задаргаа
 */
const getCarById = async (req, res) => {
  const { id } = req.params;
  const result  = await getCarDetail(id);

  res.json({
    success: true,
    data: result,
  });
};

/**
 * POST /api/cars/price-calc
 * Тусгайлан үнийн задаргаа бодох (cc, жил, KRW үнэ шууд өгч)
 * Body: { krwPrice, cc, manufactureYear }
 */
const calcPrice = async (req, res) => {
  const { krwPrice, cc, manufactureYear } = req.body;

  if (!krwPrice || !cc || !manufactureYear) {
    return res.status(400).json({
      success: false,
      message: 'krwPrice, cc, manufactureYear заавал шаардлагатай',
    });
  }

  const breakdown = await getPriceBreakdown(
    Number(krwPrice),
    Number(cc),
    Number(manufactureYear)
  );

  res.json({ success: true, data: breakdown });
};

module.exports = { getCarById, calcPrice };