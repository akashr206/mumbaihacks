import dotenv from "dotenv";
import { getDistance } from "geolib";
dotenv.config();

const GDELT_ENABLED = process.env.GDELT_ENABLED === "true";
export async function fetchNearbyNews(lat = 0, lon = 0, kmRadius = 50) {
    if (GDELT_ENABLED) {
        const q = encodeURIComponent(
            "(accident OR crash OR pollution OR festival OR fire OR 'traffic jam' OR 'stampede')"
        );
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=ArtList&format=json&maxrecords=50`;
        const r = await fetch(url);
        const j = await r.json();
        const items = (j?.articles ?? j?.articles ?? []).slice(0, 50);
        const filtered = [];
        for (const item of items) {
            const latlon =
                item?.locations?.[0]?.lat && item?.locations?.[0]?.lon
                    ? {
                          lat: Number(item.locations[0].lat),
                          lon: Number(item.locations[0].lon),
                      }
                    : null;
            if (latlon) {
                const dist =
                    getDistance(
                        { latitude: lat, longitude: lon },
                        { latitude: latlon.lat, longitude: latlon.lon }
                    ) / 1000;
                if (dist <= kmRadius) {
                    filtered.push({
                        title: item.title || item.story,
                        url: item.url,
                        snippet: item.seo_description || item.snippet || "",
                        lat: latlon.lat,
                        lon: latlon.lon,
                        published:
                            item.seendate || item.gdelt_date || Date.now(),
                    });
                }
            }
        }
        return filtered;
    } else {
        return [
            {
                title: "Major road crash on NH44 near hospital",
                url: "https://news.example.com/crash1",
                snippet:
                    "A multi-vehicle accident caused a surge of casualties near [hospital]. Local authorities reported 8 serious injuries.",
                lat,
                lon,
                published: Date.now(),
            },
            {
                title: "Festival crowd stampede reported 8 km away",
                url: "https://news.example.com/stampede",
                snippet:
                    "During the cultural festival, overcrowding led to panic and several injuries; ambulances dispatched.",
                lat: lat + 0.03,
                lon: lon - 0.02,
                published: Date.now(),
            },
            {
                title: "Pollution spike after industrial fire 12 km away",
                url: "https://news.example.com/pollution",
                snippet:
                    "An industrial fire produced smoke and a short-term air quality spike, advisory issued.",
                lat: lat - 0.08,
                lon: lon + 0.06,
                published: Date.now(),
            },
        ];
    }
}
