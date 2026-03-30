/**
 * Encar API response-аас шаардлагатай мэдээллийг гаргаж авах
 * Солонгос утгуудыг Монгол руу хөрвүүлэх
 */

// ── Солонгос → Монгол орчуулгын map ────────────────────────────────────────

const FUEL_KO = {
  '가솔린':          'Бензин',
  '디젤':            'Дизель',
  '전기':            'Цахилгаан',
  '하이브리드':      'Hybrid',
  '가솔린+전기':     'Бензин+Цахилгаан',
  '디젤+전기':       'Дизель+Цахилгаан',
  'LPG':             'Газ (LPG)',
  'lpg':             'Газ (LPG)',
  '수소':            'Устөрөгч',
  // Англи утгууд ч байвал
  'gasoline':        'Бензин',
  'petrol':          'Бензин',
  'diesel':          'Дизель',
  'electric':        'Цахилгаан',
  'hybrid':          'Hybrid',
  'gasoline+electric': 'Бензин+Цахилгаан',
};

const TRANS_KO = {
  '오토':            'Автомат',
  '자동':            'Автомат',
  '수동':            'Механик',
  '반자동':          'Хагас автомат',
  'CVT':             'CVT',
  'DCT':             'DCT',
  'automatic':       'Автомат',
  'manual':          'Механик',
};

const COLOR_KO = {
  '흰색':   'Цагаан',
  '백색':   'Цагаан',
  '검정':   'Хар',
  '검은색': 'Хар',
  '은색':   'Мөнгөлөг',
  '실버':   'Мөнгөлөг',
  '회색':   'Саарал',
  '쥐색':   'Саарал',
  '회백색': 'Цайвар саарал',
  '빨강':   'Улаан',
  '적색':   'Улаан',
  '파랑':   'Цэнхэр',
  '청색':   'Цэнхэр',
  '남색':   'Хар цэнхэр',
  '네이비': 'Хар цэнхэр',
  '초록':   'Ногоон',
  '녹색':   'Ногоон',
  '노랑':   'Шар',
  '황색':   'Шар',
  '주황':   'Улбар шар',
  '갈색':   'Хүрэн',
  '베이지': 'Бежевый',
  '금색':   'Алтан',
  '보라':   'Нил ягаан',
  '자주':   'Нил ягаан',
  '분홍':   'Ягаан',
  '진주':   'Сувдан цагаан',
};

const tr = (map, val) => {
  if (!val) return val;
  const key = String(val).trim();
  return map[key] || map[key.toLowerCase()] || val;
};

// ── Parser functions ────────────────────────────────────────────────────────

const parseCC           = (d) => d?.spec?.displacement     ?? null;
const parsePower        = (d) => d?.spec?.power            ?? null;
const parseMileage      = (d) => d?.spec?.mileage          ?? null;
const parseVehicleNo    = (d) => d?.vehicleNo              ?? null;
const parseVIN          = (d) => d?.vin                    ?? null;

const parseManufactureYear = (d) => {
  const ym = d?.category?.yearMonth;
  return ym ? parseInt(ym.substring(0, 4)) : null;
};

const parseKrwPrice = (d) => {
  const p = d?.advertisement?.price;
  return p ? p * 10000 : null;
};

const parseFuelType = (d) =>
  tr(FUEL_KO, d?.spec?.fuelName ?? null);

const parseTransmission = (d) =>
  tr(TRANS_KO, d?.spec?.transmissionName ?? null);

const parseColor = (d) =>
  tr(COLOR_KO, d?.spec?.colorName ?? null);

// ── Main export ─────────────────────────────────────────────────────────────

const parseEncarVehicle = (data) => ({
  vehicleId:       data?.vehicleId       ?? null,
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