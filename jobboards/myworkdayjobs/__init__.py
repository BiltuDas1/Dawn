from playwright.sync_api import Browser
from core import settings, logger
from models import JobData
from urllib.parse import urlparse


def match(sentence: str) -> bool:
  return len(settings.KEYWORDS.extract_keywords(sentence.lower())) != 0


def myworkdayjobs(browser: Browser, company: str, career_link: str) -> list[JobData]:
  """
  Scrapper logic that scraps the MyWorkDayJobs
  """
  result = []

  page = browser.new_page()

  try:
    page.goto(career_link, wait_until="load", timeout=60000)
  except Exception:
    logger.LOGGER.info(f"[{company}] Service Unavailable")
    return result

  try:
    page.wait_for_selector('section[data-automation-id="jobResults"]', state="visible")
  except Exception:
    logger.LOGGER.info(f"[{company}] Service Unavailable")
    return result

  jobs = (
    page.locator('section[data-automation-id="jobResults"]')
    .first.locator('ul[role="list"]')
    .first
  )
  jobs.wait_for(state="visible")
  jobs_list = jobs.locator("> li").all()

  website = "https://" + urlparse(career_link).netloc
  for job in jobs_list:
    title = job.locator("a").first.inner_text()
    url = job.locator("a").first.get_attribute("href")

    if not url or not title:
      continue

    clean_url = website + url.split("?")[0]

    if match(title):
      result.append(JobData(title=title, url=clean_url, company=company))

  return result
