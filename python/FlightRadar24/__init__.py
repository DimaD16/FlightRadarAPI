# -*- coding: utf-8 -*-

"""
Unofficial SDK for FlightRadar24.

This SDK provides flight and airport data available to the public
on the FlightRadar24 website.

See more information at:
https://www.flightradar24.com/premium/
https://www.flightradar24.com/terms-and-conditions
"""

__author__ = "DimaD16"
__version__ = "1.4.7"

from .api import Countries, FlightRadar24API, FlightTrackerConfig
from .entities import Airport, Entity, Flight
