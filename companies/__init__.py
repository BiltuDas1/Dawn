from models.website import Website
from . import zoho, jpmorgan


WEBSITES: list[Website] = []
WEBSITES.append(Website(name="Zoho", helper=zoho.scrap_zoho))
WEBSITES.append(Website(name="JPMorgan", helper=jpmorgan.scrap_jpmorgan))
