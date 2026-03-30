module.exports = {
  APICARS_BASE_URL: process.env.APICARS_BASE_URL || 'https://apicars.info/api',
  ENCAR_VEHICLE_URL: process.env.ENCAR_VEHICLE_URL || 'https://api.encar.com/v1/readside/vehicle',

  ENCAR_HEADERS: {
    Referer: 'https://www.encar.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    Accept: 'application/json',
  },

  ALLOWED_CAR_FILTERS: [
    'page', 'limit', 'brand', 'model',
    'yearFrom', 'yearTo', 'priceFrom', 'priceTo',
    'minMileage', 'maxMileage', 'fuelType', 'transmission',
    'sortBy', 'sortOrder',
  ],
};