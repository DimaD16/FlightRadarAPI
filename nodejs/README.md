# FlightRadarAPI - Node.js Edition
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/).

> [!IMPORTANT]
> This is a modified fork of the original [FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI), maintained by [@ddima16](https://github.com/DimaD16).
>
> **Contributors Wanted:** While this Node.js port is highly optimized and production-ready, **we are actively looking for contributors to port these improvements (Cloudflare bypass, etc.) back to the Python version.**

## Installation
```bash
npm install @ddima16/flightradarapi
```

## 🛡️ Cloudflare Bypass
FlightRadar24 uses Cloudflare protection. To bypass this, you **must** use a Cloudflare Worker as a proxy.

### 1. Worker Script
Deploy this script acting as a bridge:
```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Missing url parameter" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const acceptHeader = request.headers.get("Accept") || "*/*";

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept": acceptHeader,
      "X-Requested-With": "com.flightradar24.iphone"
    };

    try {
      const response = await fetch(targetUrl, { headers });
      
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
```

### 2. Initialization
```javascript
const { FlightRadar24API, Countries } = require("@ddima16/flightradarapi");

// Initialize with your worker proxy URL
const frApi = new FlightRadar24API("https://your-worker.workers.dev/?url=");

// Or set the FR24_PROXY_URL environment variable and use:
// const frApi = new FlightRadar24API();
```

## Quick Start Examples

**Getting flights:**
```javascript
let flights = await frApi.getFlights();
```

**Getting airports by country:**
```javascript
let airports = await frApi.getAirports([Countries.FRANCE, Countries.BRAZIL]);
```

**Getting airlines:**
```javascript
let airlines = await frApi.getAirlines();
```

## Legal Disclaimer
This SDK should only be used for your own educational purposes. For commercial use, please contact business@fr24.com. See [Flightradar24's terms and conditions](https://www.flightradar24.com/terms-and-conditions).

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
