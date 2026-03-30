const axios = require('axios');

/**
 * Startup дээр бүх гадны API холболт шалгах
 */

const checkApicars = async () => {
  try {
    const res = await axios.get('https://apicars.info/api/cars?limit=1', {
      headers: { 'X-API-Key': process.env.APICARS_API_KEY },
      timeout: 8000,
    });
    const total = res.data?.total ?? res.data?.data?.length ?? '?';
    console.log(`  ✅ apicars.info     — холбогдлоо (нийт машин: ${total})`);
    return true;
  } catch (err) {
    const reason = err.response
      ? `HTTP ${err.response.status}`
      : err.code === 'ECONNABORTED'
      ? 'timeout'
      : err.message;
    console.log(`  ❌ apicars.info     — АЛДАА (${reason})`);
    return false;
  }
};

const checkEncar = async () => {
  try {
    // Энэ ID бол жишээ — зөвхөн холболт шалгана
    const testId = '41478811';
    const res = await axios.get(
      `${process.env.ENCAR_VEHICLE_URL || 'https://api.encar.com/v1/readside/vehicle'}/${testId}`,
      {
        headers: {
          Referer: 'https://www.encar.com/',
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json',
        },
        timeout: 8000,
      }
    );
    const cc = res.data?.spec?.displacement ?? 'N/A';
    console.log(`  ✅ Encar API        — холбогдлоо (test cc: ${cc})`);
    return true;
  } catch (err) {
    const reason = err.response
      ? `HTTP ${err.response.status}`
      : err.code === 'ECONNABORTED'
      ? 'timeout'
      : err.message;
    console.log(`  ❌ Encar API        — АЛДАА (${reason})`);
    return false;
  }
};

const runStartupChecks = async () => {
  console.log('\n🔍 API холболт шалгаж байна...');
  const [apicarsOk, encarOk] = await Promise.all([checkApicars(), checkEncar()]);

  if (apicarsOk && encarOk) {
    console.log('🟢 Бүх API холболт амжилттай\n');
  } else {
    console.log('🟡 Зарим API холболт амжилтгүй — сервер ажиллах боловч тухайн endpoint-ууд алдаа өгнө\n');
  }
};

module.exports = { runStartupChecks };