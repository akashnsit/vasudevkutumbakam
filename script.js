// Global variables
let banyantreeImg;
let leaves = [];
let pollutionData = {
    pm25: null,
    pm10: null,
    no2: null,
    so2: null,
    co: null,
    o3: null
};
let mitigationRate = 0;
let lastUpdated = null;
let dataFetchError = false;
let p5Canvas;

// Constants
const REFRESH_INTERVAL = 60000; // 1 minute in milliseconds
const LEAF_COUNT = 200;
const API_KEY = "8906243b05abbfb5ffeca3854ef70e9a41eea33a5f12074b768108a1c2b70b8b";

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchPollutionData();
    setInterval(fetchPollutionData, REFRESH_INTERVAL);
});

async function fetchPollutionData() {
    const pollutants = ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3'];
    try {
        const results = {};
        for (let param of pollutants) {
            const base = `https://api.openaq.org/v2/measurements?parameter=${param}&limit=100&page=1&sort=desc`;
            const proxy = `https://corsproxy.io/?${encodeURIComponent(base)}`;
            const res = await fetch(proxy, {
                headers: {
                    "X-API-Key": API_KEY
                }
            });
            const json = await res.json();
            const values = json.results.map(r => r.value).filter(v => typeof v === 'number');
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            results[param.toUpperCase()] = avg;
        }

        pollutionData.pm25 = results.PM25;
        pollutionData.pm10 = results.PM10;
        pollutionData.no2 = results.NO2;
        pollutionData.so2 = results.SO2;
        pollutionData.co = results.CO;
        pollutionData.o3 = results.O3;

        mitigationRate = Math.max(0, Math.min(100, 100 - (pollutionData.pm25 / 35.4) * 100));

        updateUI();
        lastUpdated = new Date();
        document.getElementById('last-updated').textContent = `Last updated: ${lastUpdated.toLocaleTimeString()}`;
        dataFetchError = false;
    } catch (error) {
        console.error('Error fetching pollution data:', error);
        dataFetchError = true;

        document.getElementById('pollution-data').innerHTML = `
            <div class="error-message">
                <p>Unable to fetch live pollution data. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
        lastUpdated = new Date();
        document.getElementById('last-updated').textContent = `Last attempt: ${lastUpdated.toLocaleTimeString()} (failed)`;
    }
}

// ... (rest of your script.js code remains the same)

// Initialize p5.js sketch
p5Canvas = new p5(sketch);
