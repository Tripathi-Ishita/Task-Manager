// Vercel serverless function: GET /api/weather
// The middleman between the app and OpenWeather. The secret key lives only in
// Vercel's environment variables (OPENWEATHER_API_KEY), never in the app.

const CITY = 'Gurugram';

module.exports = async function handler(req, res) {
    const key = process.env.OPENWEATHER_API_KEY;
    if (!key) {
        res.status(500).json({ error: 'OPENWEATHER_API_KEY is not set' });
        return;
    }

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(CITY)}&units=metric&appid=${key}`;
        const upstream = await fetch(url);
        if (!upstream.ok) {
            res.status(502).json({ error: 'Weather service failed' });
            return;
        }
        const data = await upstream.json();

        // Cache for 10 minutes so repeated visits don't use up the free quota.
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=600');
        // Send back only what the app reads, in the same shape as OpenWeather.
        res.status(200).json({
            main: { temp: data.main.temp },
            weather: [{ description: data.weather[0].description }],
        });
    } catch {
        res.status(502).json({ error: 'Weather service unreachable' });
    }
};
