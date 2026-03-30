/**
 * Async controller-уудыг try/catch-гүй бичих боломж олгодог wrapper
 * Хэрэглэх: router.get('/path', asyncHandler(myController))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;