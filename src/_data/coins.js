// Fetch top coins from CoinGecko (no API key required)
// Cache result for ~24h using Eleventy data cascading (global data file)
export default async function () {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  // Simple cache to avoid hitting API on every local build within 24h
  const globalThisAny = /** @type {any} */ (globalThis);
  const cacheKey = "coins_cache";
  const oneDayMs = 24 * 60 * 60 * 1000;
  try {
    const now = Date.now();
    const cache = globalThisAny[cacheKey];
    if (cache && now - cache.timestamp < oneDayMs) {
      return cache.data;
    }

    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const normalized = (data || []).map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.current_price,
      market_cap: c.market_cap,
      price_change_percentage_24h: c.price_change_percentage_24h,
      high_24h: c.high_24h,
      low_24h: c.low_24h,
      total_volume: c.total_volume,
      last_updated: c.last_updated,
    }));

    globalThisAny[cacheKey] = { timestamp: now, data: normalized };
    return normalized;
  } catch (err) {
    console.error("CoinGecko fetch failed:", err);
    return [];
  }
}
