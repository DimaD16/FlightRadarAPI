# FlightRadarAPI
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/) for Node.js.

This SDK should only be used for your own educational purposes. If you are interested in accessing Flightradar24 data commercially, please contact business@fr24.com. See more information at [Flightradar24's terms and conditions](https://www.flightradar24.com/terms-and-conditions).

**Official FR24 API**: https://fr24api.flightradar24.com/

> **Note:** This is a maintained fork of [JeanExtreme002/FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI) featuring integrated Cloudflare bypass support.

[![Node.js Package](https://github.com/DimaD16/FlightRadarAPI/actions/workflows/node-package.yml/badge.svg)](https://github.com/DimaD16/FlightRadarAPI/actions)
[![Npm](https://img.shields.io/npm/v/@ddima16/flightradarapi?logo=npm&color=red)](https://www.npmjs.com/package/@ddima16/flightradarapi)
[![License](https://img.shields.io/npm/l/@ddima16/flightradarapi)](https://github.com/DimaD16/FlightRadarAPI)

## 🛡️ Cloudflare Bypass (Required)

FlightRadar24 uses Cloudflare protection. To bypass this, you **must** use a Cloudflare Worker as a proxy.

**Cloudflare Workers are free for up to 100,000 requests per day** — perfect for personal and educational use.

### Deploy the Worker
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/DimaD16/cloudflare-workers-fr24-proxy/tree/main)

> Or deploy manually — see the [worker source code](https://github.com/DimaD16/cloudflare-workers-fr24-proxy).

## Installing FlightRadarAPI:
```
$ npm install @ddima16/flightradarapi
```

## Basic Usage:

Import the class `FlightRadar24API` and create an instance of it.
```javascript
const { FlightRadar24API, Countries } = require("@ddima16/flightradarapi");

// Initialize with your worker proxy URL
const frApi = new FlightRadar24API("https://your-worker.workers.dev/?url=");
// Or via environment variable: FR24_PROXY_URL=https://your-worker.workers.dev/?url=
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
let airlines = await frApi.getAirlines();  // Returns detailed airline information with IATA/ICAO codes
```

**Getting zones list:**
```javascript
let zones = await frApi.getZones();
```

**Using Countries enum:**
```javascript
// Available countries in the Countries enum
const { Countries } = require("@ddima16/flightradarapi");

// Examples of country codes:
Countries.UNITED_STATES    // "united-states"
Countries.BRAZIL           // "brazil" 
Countries.GERMANY          // "germany"
Countries.FRANCE           // "france"
// ... and many more
```

## Documentation
Explore the documentation of FlightRadarAPI package, for Python or NodeJS, through [this site](https://JeanExtreme002.github.io/FlightRadarAPI/).

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
