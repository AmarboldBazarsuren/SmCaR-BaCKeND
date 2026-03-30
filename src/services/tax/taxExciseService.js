const TaxConfig = require('../../models/TaxConfig');

/**
 * Машины насыг тооцоолох
 * @param {number} manufactureYear
 */
const getCarAge = (manufactureYear) =>
  new Date().getFullYear() - manufactureYear;

/**
 * CC-р тохирох татварын мөр олох
 * @param {Array} entries - TaxConfig entries
 * @param {number} cc
 */
const findEntry = (entries, cc) =>
  entries.find((e) => cc >= e.engineMin && cc <= e.engineMax);

/**
 * Насны ангиллаар татварын дүн авах
 * @param {Object} entry
 * @param {number} age
 */
const getTaxByAge = (entry, age) => {
  if (age <= 3) return entry.tax0to3;
  if (age <= 6) return entry.tax4to6;
  if (age <= 9) return entry.tax7to9;
  return entry.tax10plus;
};

/**
 * Онцгой албан татвар тооцоолох (₮)
 * @param {number} cc              - Хөдөлгүүрийн хэмжээ (cc)
 * @param {number} manufactureYear - Үйлдвэрлэсэн он
 * @returns {Promise<number>}      - Татварын дүн (₮)
 */
const calculateExciseTax = async (cc, manufactureYear) => {
  if (!cc || !manufactureYear) return 0;

  const config = await TaxConfig.getActive();
  const age    = getCarAge(manufactureYear);
  const entry  = findEntry(config.entries, cc);

  if (!entry) {
    console.warn(`⚠️  TaxConfig: ${cc}cc-д тохирох татварын мөр олдсонгүй`);
    return 0;
  }

  return getTaxByAge(entry, age);
};

module.exports = { calculateExciseTax, getCarAge };