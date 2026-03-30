const axios = require('axios');
const { APICARS_BASE_URL, ALLOWED_CAR_FILTERS } = require('../../config/constants');

const API_KEY = () => process.env.APICARS_API_KEY;

// ── In-memory cache (5 минут) ───────────────────────────────────────────────
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const getCached = (key) => {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { _cache.delete(key); return null; }
  return entry.data;
};
const setCache = (key, data) => _cache.set(key, { data, ts: Date.now() });

// ── Serial queue — нэг зэрэг зөвхөн 1 хүсэлт ──────────────────────────────
let _tail = Promise.resolve();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const enqueue = (fn) => {
  const result = _tail.then(fn);
  // Алдаа гарсан ч queue үргэлжлэх ёстой
  _tail = result.catch(() => {});
  return result;
};

// ── Query builder ───────────────────────────────────────────────────────────
const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  ALLOWED_CAR_FILTERS.forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });
  return params.toString();
};

// ── Core HTTP call with 1 retry on 429 ─────────────────────────────────────
const doRequest = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: { 'X-API-Key': API_KEY() },
      timeout: 15000,
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 429) {
      console.warn('⚠️  429 rate limit — 3s хүлээж дахин оролдоно...');
      await sleep(3000);
      const res2 = await axios.get(url, {
        headers: { 'X-API-Key': API_KEY() },
        timeout: 15000,
      });
      return res2.data;
    }
    throw err;
  }
};

// ── Public API ──────────────────────────────────────────────────────────────
const fetchCarList = (filters = {}) => {
  const qs       = buildQueryString(filters);
  const cacheKey = `cars||${qs}`;
  const url      = `${APICARS_BASE_URL}/cars${qs ? `?${qs}` : ''}`;

  // Cache-д байвал шууд буцаах (queue-д орохгүй)
  const hit = getCached(cacheKey);
  if (hit) return Promise.resolve(hit);

  // Queue-д нэмж дараалан явуулах
  return enqueue(async () => {
    // Queue дотор ч давхар шалгах
    const hit2 = getCached(cacheKey);
    if (hit2) return hit2;

    const data = await doRequest(url);
    setCache(cacheKey, data);
    await sleep(500); // хүсэлт хооронд 500ms завсар
    return data;
  });
};

module.exports = { fetchCarList };