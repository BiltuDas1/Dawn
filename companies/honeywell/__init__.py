from playwright.sync_api import Browser
from models import JobData
from jobboards import oracle_cloud


HONEYWELL_CAREERS = "https://careers.honeywell.com/en/sites/Honeywell/jobs?lastSelectedFacet=CATEGORIES&mode=location&selectedCategoriesFacet=300000017425610&selectedLocationsFacet=300000000469485&selectedPostingDatesFacet=7"


def scrap_honeywell(browser: Browser) -> list[JobData]:
  return oracle_cloud.oracle_cloud(browser, "Honeywell", HONEYWELL_CAREERS)
