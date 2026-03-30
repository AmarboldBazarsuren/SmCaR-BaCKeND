const axios = require('axios');
const { ENCAR_VEHICLE_URL, ENCAR_HEADERS } = require('../../config/constants');

/**
 * Encar API-аас нэг машины дэлгэрэнгүй мэдээлэл авах
 * URL: https://api.encar.com/v1/readside/vehicle/{vehicleId}
 * Browser-с CORS хоригтой → заавал server-side дуудна
 * @param {string|number} vehicleId - Encar vehicle ID (жишээ: 41478811)
 */
const fetchEncarVehicle = async (vehicleId) => {
  const url = `${ENCAR_VEHICLE_URL}/${vehicleId}`;

  const response = await axios.get(url, {
    headers: ENCAR_HEADERS,
    timeout: 10000,
  });

  return response.data;
};

module.exports = { fetchEncarVehicle };