// Энэ файлыг backend root-д хийж ажиллуулна: node debugEncarImage.js
// Encar API-ийн photos field-ийн бүтцийг шалгана

require('dotenv').config();
const axios = require('axios');

const TEST_IDS = ['41739536', '41478811']; // 2 машин туршина

const ENCAR_HEADERS = {
  Referer: 'https://www.encar.com/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Accept: 'application/json',
};

(async () => {
  for (const id of TEST_IDS) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Vehicle ID: ${id}`);
    console.log('='.repeat(60));

    try {
      const res = await axios.get(
        `https://api.encar.com/v1/readside/vehicle/${id}`,
        { headers: ENCAR_HEADERS, timeout: 10000 }
      );
      const d = res.data;

      // photos field шалгах
      console.log('\n📷 photos field:');
      if (d?.photos) {
        console.log('  Type:', typeof d.photos);
        console.log('  Length:', Array.isArray(d.photos) ? d.photos.length : 'not array');
        if (Array.isArray(d.photos) && d.photos.length > 0) {
          console.log('  First photo:', JSON.stringify(d.photos[0], null, 2));
          console.log('  Second photo:', JSON.stringify(d.photos[1], null, 2));
        }
      } else {
        console.log('  ❌ photos field байхгүй');
      }

      // Бүх top-level key-үүдийг харах
      console.log('\n🔑 Top-level keys:', Object.keys(d));

      // category шалгах
      console.log('\n📁 category:', JSON.stringify(d?.category, null, 2));

      // advertisement шалгах
      console.log('\n💰 advertisement:', JSON.stringify(d?.advertisement, null, 2));

      // imageUrl эсвэл ижил төстэй field байгаа эсэх
      const allKeys = JSON.stringify(d);
      const imageKeys = ['imageUrl', 'imgUrl', 'img', 'picture', 'pic', 'photo', 'image', 'thumbnail'];
      console.log('\n🔍 Зурагтай холбоотой keyword хайлт:');
      imageKeys.forEach(k => {
        if (allKeys.toLowerCase().includes(k.toLowerCase())) {
          console.log(`  ✅ "${k}" гэсэн field/value олдлоо`);
        }
      });

    } catch (err) {
      console.log('❌ Алдаа:', err.message);
      if (err.response) {
        console.log('   Status:', err.response.status);
        console.log('   Data:', JSON.stringify(err.response.data).substring(0, 200));
      }
    }
  }
})();