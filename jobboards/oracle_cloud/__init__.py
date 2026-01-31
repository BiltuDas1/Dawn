from playwright.sync_api import Browser
from core import settings, logger
from models import JobData


def match(sentence: str) -> bool:
  return len(settings.KEYWORDS.extract_keywords(sentence.lower())) != 0


def oracle_cloud(browser: Browser, company: str, career_link: str) -> list[JobData]:
  """
  Scrapper logic that scraps the Oracle Cloud
  """
  result = []

  page = browser.new_page()

  try:
    page.goto(career_link, wait_until="load", timeout=60000)
  except Exception:
    logger.LOGGER.info(f"[{company}] Service Unavailable")
    return result

  page.wait_for_selector("#panel-list", state="visible")

  jobs = page.locator("#panel-list")
  for job in jobs.locator('li[data-qa="searchResultItem"]').all():
    url = job.locator("a").get_attribute("href")
    if url is None:
      continue

    clean_url = url.split("?")[0]
    title = (
      job.locator("search-result-item-header")
      .first.locator('span[data-bind="text: job.title"]')
      .first.inner_text()
    )

    if match(title):
      result.append(JobData(title=title, url=clean_url, company=company))

  return result
