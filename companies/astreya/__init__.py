from playwright.sync_api import Browser
from models import JobData
from jobboards import myworkdayjobs


ASTREYA_CAREERS = "https://astreya.wd5.myworkdayjobs.com/en-US/life-at-astreya-opportunities?jobFamilyGroup=98cfd9c8c1e5011e764f630baf01ce7d&jobFamilyGroup=98cfd9c8c1e501497164938eae019c7d&jobFamilyGroup=e035002b03bc01872ef43e8723145332&locationCountry=c4f78be1a8f14da0ab49ce1162348a5e"


def scrap_astreya(browser: Browser) -> list[JobData]:
  return myworkdayjobs.myworkdayjobs(browser, "Astreya", ASTREYA_CAREERS)
