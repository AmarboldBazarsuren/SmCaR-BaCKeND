const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  subtitle:   { type: String, default: '' },
  imageUrl:   { type: String, required: true },
  linkUrl:    { type: String, default: '' },
  buttonText: { type: String, default: 'Дэлгэрэнгүй үзэх' },
  isActive:   { type: Boolean, default: true },
  order:      { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);