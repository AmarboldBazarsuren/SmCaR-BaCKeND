/**
 * Encar API response-аас шаардлагатай мэдээллийг гаргаж авах
 *
 * Encar response бүтэц:
 *   spec.displacement → CC (хөдөлгүүрийн хэмжээ)
 *   spec.power        → HP (хүч)
 *   category.yearMonth → үйлдвэрлэсэн он сар (жишээ: "202109")
 *   advertisement.price → үнэ in 만원 (×10000 = KRW)
 */

const parseCC = (data) =>
  data?.spec?.displacement ?? null;

const parsePower = (data) =>
  data?.spec?.power ?? null;

const parseManufactureYear = (data) => {
  const ym = data?.category?.yearMonth;
  return ym ? parseInt(ym.substring(0, 4)) : null;
};

const parseKrwPrice = (data) => {
  const priceInManWon = data?.advertisement?.price;
  return priceInManWon ? priceInManWon * 10000 : null;
};

const parseVehicleNo = (data) => data?.vehicleNo ?? null;
const parseVIN       = (data) => data?.vin ?? null;
const parseMileage   = (data) => data?.spec?.mileage ?? null;
const parseFuelType  = (data) => data?.spec?.fuelName ?? null;
const parseTransmission = (data) => data?.spec?.transmissionName ?? null;
const parseColor     = (data) => data?.spec?.colorName ?? null;

/**
 * Encar raw data → хэрэглэх боломжтой object
 */
const parseEncarVehicle = (data) => ({
  vehicleId:       data?.vehicleId ?? null,
  vehicleNo:       parseVehicleNo(data),
  vin:             parseVIN(data),
  cc:              parseCC(data),
  power:           parsePower(data),
  manufactureYear: parseManufactureYear(data),
  krwPrice:        parseKrwPrice(data),
  mileage:         parseMileage(data),
  fuelType:        parseFuelType(data),
  transmission:    parseTransmission(data),
  color:           parseColor(data),
});

module.exports = { parseEncarVehicle };