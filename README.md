# FlightRadarAPI
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/) for Python 3 and Node.js.

> **Fork Information:** This is a modified fork of the original [FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI), maintained by [@ddima16](https://github.com/DimaD16).
>
> **Contributors Wanted:** While this Node.js port is highly optimized and production-ready, we are actively looking for contributors to port these improvements (Cloudflare bypass, etc.) back to the Python version.

This SDK should only be used for your own educational purposes. If you are interested in accessing Flightradar24 data commercially, please contact business@fr24.com. See more information at [Flightradar24's terms and conditions](https://www.flightradar24.com/terms-and-conditions).

**Official FR24 API**: https://fr24api.flightradar24.com/

[![Node.js Package](https://github.com/DimaD16/FlightRadarAPI/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/DimaD16/FlightRadarAPI/actions)
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
let flights = await frApi.getFlights();  // Returns a list of Flight objects
```

**Getting airports list (requires country selection):**
```javascript
// Get airports from specific countries
let airports = await frApi.getAirports([Countries.BRAZIL, Countries.UNITED_STATES]);  // Returns a list of Airport objects
```

**Getting airlines list:**
```javascript
let airlines = await frApi.getAirlines();  // Returns detailed airline information
```

**Getting zones list:**
```javascript
let zones = await frApi.getZones();
```

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
