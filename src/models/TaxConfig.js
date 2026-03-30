const mongoose = require('mongoose');

const taxEntrySchema = new mongoose.Schema({
  engineLabel: { type: String, required: true },
  engineMin:   { type: Number, required: true },
  engineMax:   { type: Number, required: true }, // Infinity → 999999
  tax0to3:     { type: Number, required: true },
  tax4to6:     { type: Number, required: true },
  tax7to9:     { type: Number, required: true },
  tax10plus:   { type: Number, required: true },
});

const taxConfigSchema = new mongoose.Schema({
  name:      { type: String,  default: 'Стандарт татварын хүснэгт' },
  isActive:  { type: Boolean, default: true },
  entries:   [taxEntrySchema],
  updatedBy: { type: String,  default: 'admin' },
  note:      { type: String,  default: '2020.12.06 батлагдсан онцгой албан татварын хүснэгт' },
}, { timestamps: true });

// 2020.12.06 батлагдсан хүснэгт (cc × нас → ₮)
const DEFAULT_ENTRIES = [
  { engineLabel: '1500cc ба түүнээс доош', engineMin: 0,    engineMax: 1500,  tax0to3: 750000,   tax4to6: 1600000,  tax7to9: 3350000,  tax10plus: 10000000 },
  { engineLabel: '1501 - 2500cc',          engineMin: 1501, engineMax: 2500,  tax0to3: 2300000,  tax4to6: 3200000,  tax7to9: 5000000,  tax10plus: 11700000 },
  { engineLabel: '2501 - 3500cc',          engineMin: 2501, engineMax: 3500,  tax0to3: 3050000,  tax4to6: 4000000,  tax7to9: 6700000,  tax10plus: 13350000 },
  { engineLabel: '3501 - 4500cc',          engineMin: 3501, engineMax: 4500,  tax0to3: 6850750,  tax4to6: 8000000,  tax7to9: 10850000, tax10plus: 17500000 },
  { engineLabel: '4501cc ба түүнээс дээш', engineMin: 4501, engineMax: 999999,tax0to3: 14210000, tax4to6: 27200000, tax7to9: 39150000, tax10plus: 65975000 },
];

taxConfigSchema.statics.getActive = async function () {
  let config = await this.findOne({ isActive: true }).sort({ createdAt: -1 });
  if (!config) {
    config = await this.create({ isActive: true, entries: DEFAULT_ENTRIES });
    console.log('✅ Default TaxConfig үүслээ');
  }
  return config;
};

module.exports = mongoose.model('TaxConfig', taxConfigSchema);