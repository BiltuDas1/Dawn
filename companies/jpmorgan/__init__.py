from playwright.sync_api import Browser
from models import JobData
from jobboards import oracle_cloud


JPMORGAN_CAREERS = "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/jobs?lastSelectedFacet=POSTING_DATES&location=India&locationId=300000000289360&locationLevel=country&mode=location&selectedCategoriesFacet=300000086152753&selectedPostingDatesFacet=7"


def scrap_jpmorgan(browser: Browser) -> list[JobData]:
  return oracle_cloud.oracle_cloud(browser, "JPMorgan", JPMORGAN_CAREERS)
