/**
 * Глобал алдааны handler
 * Express app.use(errorHandler) - хамгийн сүүлд бүртгэнэ
 */
const errorHandler = (err, req, res, next) => {
  console.error(`❌ [${req.method}] ${req.path} →`, err.message);

  // Axios алдаа (3rd-party API дуудлагын алдаа)
  if (err.response) {
    return res.status(err.response.status || 502).json({
      success: false,
      message: `Гадны API алдаа: ${err.message}`,
      upstream: {
        status: err.response.status,
        url:    err.config?.url,
      },
    });
  }

  // Timeout алдаа
  if (err.code === 'ECONNABORTED') {
    return res.status(504).json({
      success: false,
      message: 'Хүсэлт хэт удаан хүлээлсэн (timeout)',
    });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Серверийн алдаа гарлаа',
  });
};

module.exports = errorHandler;