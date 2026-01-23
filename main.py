from playwright.sync_api import sync_playwright
import companies
from core import logger, debug, settings


def start_scrapping():
  with sync_playwright() as play:
    browser = play.chromium.launch(headless=True)

    for website in companies.WEBSITES:
      logger.LOGGER.debug("Scrapping Company: %s", website.name)
      result = website.helper(browser)
      logger.LOGGER.debug("Found URLs: %s", result)

    browser.close()


if __name__ == "__main__":
  print("Debug Mode: " + ("On" if debug.DEBUG else "Off"), flush=True)
  logger.LOGGER.debug(
    "Keywords to Look for: %s", settings.KEYWORDS.get_all_keywords().keys()
  )
  start_scrapping()
