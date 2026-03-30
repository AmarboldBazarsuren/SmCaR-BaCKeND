const PriceConfig = require('../../models/PriceConfig');
const { calculateExciseTax } = require('./taxExciseService');

/**
 * Image 6-д харуулсан үнийн бүрэн задаргаа бодох
 *
 * Томьёо:
 *   mntBasePrice  = krwPrice × krwToMntRate
 *   CIF           = mntBasePrice + shippingCost
 *   exciseTax     = TaxConfig-аас (cc × нас)
 *   customsDuty   = CIF × 5%
 *   vat           = (CIF + customsDuty + exciseTax) × 10%
 *   total         = mntBasePrice + serviceFee + shippingCost + exciseTax + customsDuty + vat
 *
 * @param {number} krwPrice        - Үнэ KRW-д (₩)
 * @param {number} cc              - Хөдөлгүүрийн хэмжээ (cc)
 * @param {number} manufactureYear - Үйлдвэрлэсэн он
 */
const calculatePriceBreakdown = async (krwPrice, cc, manufactureYear) => {
  const cfg = await PriceConfig.getActive();

  const mntBasePrice = Math.round(krwPrice * cfg.krwToMntRate);
  const cifValue     = mntBasePrice + cfg.shippingCost;
  const exciseTax    = await calculateExciseTax(cc, manufactureYear);
  const customsDuty  = Math.round(cifValue * cfg.customsDutyRate);
  const vat          = Math.round((cifValue + customsDuty + exciseTax) * cfg.vatRate);
  const customsAndVat = customsDuty + vat;

  const totalPrice = mntBasePrice + cfg.serviceFee + cfg.shippingCost + exciseTax + customsAndVat;

  return {
    krwBasePrice:     krwPrice,
    mntBasePrice,
    serviceFee:       cfg.serviceFee,
    shippingCost:     cfg.shippingCost,
    exciseTax,
    customsDuty,
    vat,
    customsAndVat,
    totalPrice,
    advancePayment:   Math.round(totalPrice * cfg.advancePaymentRate),
    remainingPayment: Math.round(totalPrice * cfg.remainingPaymentRate),
    exchangeRate:     cfg.krwToMntRate,
  };
};

module.exports = { calculatePriceBreakdown };