require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const { runStartupChecks } = require('./src/services/startup/startupCheckService');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await runStartupChecks();

    app.listen(PORT, () => {
      console.log(`🚀 SMCar Backend:    http://localhost:${PORT}`);
      console.log(`📦 Environment:      ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📌 Endpoints:`);
      console.log(`   GET  /health`);
      console.log(`   GET  /api/cars`);
      console.log(`   GET  /api/cars/:id`);
      console.log(`   POST /api/cars/price-calc`);
      console.log(`   GET  /api/admin/price-config`);
      console.log(`   GET  /api/admin/tax-config\n`);
    });
  } catch (error) {
    console.error('❌ Server start failed:', error.message);
    process.exit(1);
  }
};

startServer();