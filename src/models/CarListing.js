// backend/src/models/CarListing.js
const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  brand:        { type: String, required: true },
  model:        { type: String, default: '' },
  year:         { type: Number },
  mileage:      { type: Number },
  fuelType:     { type: String, default: '' },
  transmission: { type: String, default: '' },
  cc:           { type: Number },
  color:        { type: String, default: '' },
  krwPrice:     { type: Number },
  description:  { type: String, default: '' },
  images:       [{ type: String }],   // бүх зургуудын URL массив
  linkUrl:      { type: String, default: '' },
  isActive:     { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CarListing', carListingSchema);