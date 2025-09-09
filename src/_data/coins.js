// Fetch top coins from CoinGecko (no API key required)
// Returned array is used to generate pages programmatically.
export default async function () {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  try {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Normalize minimal fields we'll use in templates
    return (data || []).map((c) => ({
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
  } catch (err) {
    console.error("CoinGecko fetch failed:", err);
    return [];
  }
}
