const mongoose = require('mongoose');

const priceConfigSchema = new mongoose.Schema({
  name:     { type: String,  default: 'Стандарт үнийн тохиргоо' },
  isActive: { type: Boolean, default: true },

  // Ханш: ₩1 = ₮X (жишээ: 2.40 гэвэл ₩1 = ₮2.40)
  krwToMntRate: { type: Number, default: 2.40 },

  // Тогтмол шимтгэлүүд (₮)
  serviceFee:   { type: Number, default: 800000 },    // Монгол үйлчилгээний шимтгэл
  shippingCost: { type: Number, default: 4630600 },   // Тээврийн зардал (Солонгос → Монгол)

  // Татварын хувь
  customsDutyRate: { type: Number, default: 0.05 },   // Гааль 5%
  vatRate:         { type: Number, default: 0.10 },   // НӨАТ 10%

  // Урьдчилгаа/үлдэгдлийн харьцаа
  advancePaymentRate:   { type: Number, default: 0.72 }, // 72% урьдчилгаа
  remainingPaymentRate: { type: Number, default: 0.28 }, // 28% монголд ирэхэд

  updatedBy: { type: String, default: 'admin' },
}, { timestamps: true });

priceConfigSchema.statics.getActive = async function () {
  let config = await this.findOne({ isActive: true }).sort({ createdAt: -1 });
  if (!config) {
    config = await this.create({ isActive: true });
    console.log('✅ Default PriceConfig үүслээ');
  }
  return config;
};

module.exports = mongoose.model('PriceConfig', priceConfigSchema);