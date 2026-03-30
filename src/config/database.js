const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI тохируулаагүй байна (.env файл шалгана уу)');

  const conn = await mongoose.connect(uri);
  console.log(`✅ MongoDB холбогдлоо: ${conn.connection.host}`);
};

module.exports = connectDB;