const { fetchEncarVehicle }     = require('../encar/encarFetchVehicleService');
const { parseEncarVehicle }     = require('../encar/encarParseVehicleService');
const { calculatePriceBreakdown } = require('../tax/taxPriceBreakdownService');

/**
 * Нэг машины бүрэн мэдээлэл цуглуулах:
 *   1. Encar API → cc, power, жил, KRW үнэ
 *   2. TaxConfig + PriceConfig → үнийн задаргаа
 *
 * @param {string|number} vehicleId - Encar vehicle ID
 */
const getCarDetail = async (vehicleId) => {
  // 1. Encar-аас raw data татах
  const rawData  = await fetchEncarVehicle(vehicleId);

  // 2. Хэрэглэх мэдээлэл гаргах
  const carInfo  = parseEncarVehicle(rawData);

  if (!carInfo.krwPrice) {
    throw new Error(`Машины үнэ олдсонгүй (vehicleId: ${vehicleId})`);
  }

  // 3. Үнийн задаргаа бодох
  const priceBreakdown = await calculatePriceBreakdown(
    carInfo.krwPrice,
    carInfo.cc,
    carInfo.manufactureYear
  );

  return {
    vehicleId,
    carInfo,
    priceBreakdown,
  };
};

/**
 * Зөвхөн үнийн задаргаа (cc + жил + KRW үнэ шууд өгөх)
 */
const getPriceBreakdown = async (krwPrice, cc, manufactureYear) => {
  return calculatePriceBreakdown(krwPrice, cc, manufactureYear);
};

module.exports = { getCarDetail, getPriceBreakdown };