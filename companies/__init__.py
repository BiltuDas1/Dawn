from models.website import Website
from . import zoho


WEBSITES: list[Website] = []
WEBSITES.append(Website(name="Zoho", helper=zoho.scrap_zoho))
