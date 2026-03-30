const axios = require('axios');
const { APICARS_BASE_URL, ALLOWED_CAR_FILTERS } = require('../../config/constants');

const API_KEY = () => process.env.APICARS_API_KEY;

/**
 * Зөвшөөрөгдсөн filter-ийг URL params болгох
 */
const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  ALLOWED_CAR_FILTERS.forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  return params.toString();
};

/**
 * apicars.info API-аас машины жагсаалт татах
 * @param {Object} filters - Query filters (brand, model, yearFrom, ...)
 */
const fetchCarList = async (filters = {}) => {
  const qs  = buildQueryString(filters);
  const url = `${APICARS_BASE_URL}/cars${qs ? `?${qs}` : ''}`;

  const response = await axios.get(url, {
    headers: { 'X-API-Key': API_KEY() },
    timeout: 15000,
  });

  return response.data;
};

module.exports = { fetchCarList };