# FlightRadarAPI — Python
Unofficial SDK for [FlightRadar24](https://www.flightradar24.com/) for Python 3, with integrated Cloudflare bypass support.

> **Fork notice:** This is a maintained fork of [JeanExtreme002/FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI), adding Cloudflare Worker proxy support for both Python and Node.js.

This SDK should only be used for educational purposes. See [FlightRadar24's terms and conditions](https://www.flightradar24.com/terms-and-conditions).

[![PyPI](https://img.shields.io/pypi/v/FlightRadarAPI?logo=pypi)](https://pypi.org/project/FlightRadarAPI/)
[![License](https://img.shields.io/pypi/l/FlightRadarAPI)](https://github.com/DimaD16/FlightRadarAPI)
[![Python Version](https://img.shields.io/badge/python-3.7+-8A2BE2)](https://pypi.org/project/FlightRadarAPI/)

## Installation

```bash
pip install FlightRadarAPI
```

## 🛡️ Cloudflare Bypass (Required)

FlightRadar24 uses Cloudflare protection. You **must** deploy a Cloudflare Worker proxy first.

**Cloudflare Workers are free for up to 100,000 requests per day** — perfect for personal and educational use.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/DimaD16/cloudflare-workers-fr24-proxy/tree/main)

> Or deploy manually — see the [worker source code](https://github.com/DimaD16/cloudflare-workers-fr24-proxy).

## Basic Usage

```python
from FlightRadar24 import FlightRadar24API, Countries

# Initialize with your worker proxy URL
fr_api = FlightRadar24API(proxy_url="https://your-worker.workers.dev/?url=")

# Or use an environment variable instead:
# export FR24_PROXY_URL="https://your-worker.workers.dev/?url="
# fr_api = FlightRadar24API()
```

**Getting flights list:**
```python
flights = fr_api.get_flights()
```

**Getting airports list (requires country selection):**
```python
airports = fr_api.get_airports([Countries.BRAZIL, Countries.UNITED_STATES])
```

**Getting airlines list:**
```python
airlines = fr_api.get_airlines()
```

**Getting zones list:**
```python
zones = fr_api.get_zones()
```

**Search:**
```python
results = fr_api.search("Paris")
```

**Getting flight details:**
```python
flights = fr_api.get_flights(airline="DAL")
details = fr_api.get_flight_details(flights[0])
```

---
*Maintained with ❤️ by [@ddima16](https://github.com/DimaD16)*
