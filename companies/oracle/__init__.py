from playwright.sync_api import Browser
from models import JobData
from companies import jpmorgan


ORACLE_CAREERS = "https://careers.oracle.com/en/sites/jobsearch/jobs?lastSelectedFacet=AttributeChar6&location=India&locationId=300000000106947&selectedFlexFieldsFacets=%22AttributeChar6%7CSee+Job+Description%3B0+to+2%2B+years%22&selectedLocationsFacet=300000000106947&selectedPostingDatesFacet=30"


def scrap_oracle(browser: Browser) -> list[JobData]:
  jpmorgan.JPMORGAN_CAREERS = ORACLE_CAREERS
  return jpmorgan.scrap_jpmorgan(browser, "Oracle")
