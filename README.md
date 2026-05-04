# FlightRadarAPI
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/) for Python 3 and Node.js.

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

[![Node.js Package](https://github.com/DimaD16/FlightRadarAPI/actions/workflows/node-package.yml/badge.svg)](https://github.com/DimaD16/FlightRadarAPI/actions)
[![License](https://img.shields.io/npm/l/@ddima16/flightradarapi)](https://github.com/DimaD16/FlightRadarAPI)
[![Npm](https://img.shields.io/npm/v/@ddima16/flightradarapi?logo=npm&color=red)](https://www.npmjs.com/package/@ddima16/flightradarapi)

## Installing FlightRadarAPI:
```bash
npm install @ddima16/flightradarapi
```

## 🛡️ Cloudflare Bypass (Required)
FlightRadar24 uses Cloudflare protection. To bypass this, you **must** use a Cloudflare Worker as a proxy.

### 1. Worker Script
Deploy this to a [Cloudflare Worker](https://workers.cloudflare.com/):
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

### 2. Basic Usage:

Import the class `FlightRadar24API` and create an instance of it with your worker URL.
```javascript
const { FlightRadar24API, Countries } = require("@ddima16/flightradarapi");

// Initialize with your worker proxy
const frApi = new FlightRadar24API("https://your-worker.workers.dev/?url=");
```

**Getting flights list:**
```javascript
let flights = await frApi.getFlights();
```

**Getting airports list (requires country selection):**
```javascript
let airports = await frApi.getAirports([Countries.BRAZIL, Countries.UNITED_STATES]);
```

**Getting airlines list:**
```javascript
let airlines = await frApi.getAirlines();
```

**Getting zones list:**
```javascript
let zones = await frApi.getZones();
```

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
