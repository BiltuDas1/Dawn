from pydantic import BaseModel
from typing import Callable
from playwright.sync_api import Browser
from .jobdata import JobData


class Website(BaseModel):
  name: str
  helper: Callable[[Browser], list[JobData]]
