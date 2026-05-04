# FlightRadarAPI
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/) for Python 3 and Node.js.

This SDK should only be used for your own educational purposes. If you are interested in accessing Flightradar24 data commercially, please contact business@fr24.com. See more information at [Flightradar24's terms and conditions](https://www.flightradar24.com/terms-and-conditions).

**Official FR24 API**: https://fr24api.flightradar24.com/

> **Note:** This is a maintained fork of [JeanExtreme002/FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI) featuring integrated Cloudflare bypass support for both Node.js and Python.

[![Python Package](https://github.com/DimaD16/FlightRadarAPI/actions/workflows/python-package.yml/badge.svg)](https://github.com/DimaD16/FlightRadarAPI/actions)
[![Node.js Package](https://github.com/DimaD16/FlightRadarAPI/actions/workflows/node-package.yml/badge.svg)](https://github.com/DimaD16/FlightRadarAPI/actions)
[![Pypi](https://img.shields.io/pypi/v/FlightRadarAPI?logo=pypi)](https://pypi.org/project/FlightRadarAPI/)
[![License](https://img.shields.io/pypi/l/FlightRadarAPI)](https://github.com/DimaD16/FlightRadarAPI)
[![Python Version](https://img.shields.io/badge/python-3.7+-8A2BE2)](https://pypi.org/project/FlightRadarAPI/)
[![Npm](https://img.shields.io/npm/v/@ddima16/flightradarapi?logo=npm&color=red)](https://www.npmjs.com/package/@ddima16/flightradarapi)
[![Downloads](https://static.pepy.tech/personalized-badge/flightradarapi?period=total&units=international_system&left_color=grey&right_color=orange&left_text=downloads)](https://pypi.org/project/FlightRadarAPI/)
[![Frequency](https://img.shields.io/pypi/dm/flightradarapi?style=flat&label=frequency)](https://pypi.org/project/FlightRadarAPI/)

## 🛡️ Cloudflare Bypass (Required)

FlightRadar24 uses Cloudflare protection. To bypass this, you **must** use a Cloudflare Worker as a proxy.

**Cloudflare Workers are free for up to 100,000 requests per day** — perfect for personal and educational use.

### Deploy the Worker

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/DimaD16/cloudflare-workers-fr24-proxy/tree/main)

> Or deploy manually — see the [worker source code](https://github.com/DimaD16/cloudflare-workers-fr24-proxy).

---

## Installing FlightRadarAPI

**For Python with pip:**
```
pip install ddima16-flightradarapi
```

**For Node.js with npm:**
```
npm install @ddima16/flightradarapi
```

---

## Basic Usage

### Python
Import the class `FlightRadar24API` and create an instance of it.
```python
from FlightRadar24 import FlightRadar24API, Countries

# Initialize with your worker proxy URL
fr_api = FlightRadar24API(proxy_url="https://your-worker.workers.dev/?url=")
# Or via environment variable: FR24_PROXY_URL=https://your-worker.workers.dev/?url=
```

**Getting flights list:**
```python
flights = fr_api.get_flights()  # Returns a list of Flight objects
```

**Getting airports list (requires country selection):**
```python
airports = fr_api.get_airports([Countries.BRAZIL, Countries.UNITED_STATES])  # Returns a list of Airport objects
```

**Getting airlines list:**
```python
airlines = fr_api.get_airlines()
```

**Getting zones list:**
```python
zones = fr_api.get_zones()
```

### Node.js
Import the class `FlightRadar24API` and create an instance of it.
```javascript
const { FlightRadar24API, Countries } = require("@ddima16/flightradarapi");
const frApi = new FlightRadar24API("https://your-worker.workers.dev/?url=");
// Or via environment variable: FR24_PROXY_URL=https://your-worker.workers.dev/?url=
```

**Getting flights list:**
```javascript
let flights = await frApi.getFlights();  // Returns a list of Flight objects
```

**Getting airports list (requires country selection):**
```javascript
let airports = await frApi.getAirports([Countries.BRAZIL, Countries.UNITED_STATES]);  // Returns a list of Airport objects
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

## Documentation
Explore the documentation of FlightRadarAPI package, for Python or NodeJS, through [this site](https://JeanExtreme002.github.io/FlightRadarAPI/).

---

*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
