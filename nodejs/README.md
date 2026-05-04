# FlightRadarAPI - Node.js Edition
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/).

### ⚖️ Legal Disclaimer
> **This software is provided for educational, research, and personal use only.**
> 
> The authors and contributors of this SDK are **not affiliated**, associated, authorized, endorsed by, or in any way officially connected with FlightRadar24 or any of its subsidiaries or affiliates. 
> 
> Use of this SDK is subject to [FlightRadar24's Terms and Conditions](https://www.flightradar24.com/terms-and-conditions). The user takes full responsibility for any actions taken using this library. The software is provided "as is", without warranty of any kind, express or implied.
>
> For commercial data access, please contact the official team at [business@fr24.com](mailto:business@fr24.com) or visit the [Official FR24 API](https://fr24api.flightradar24.com/).

> **Note:** This is a maintained fork of [JeanExtreme002/FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI) featuring integrated Cloudflare bypass support.
>
> **Contributors Wanted:** We are actively looking for contributors to port these improvements (Cloudflare bypass, etc.) back to the Python version.

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

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
