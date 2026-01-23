from pydantic import BaseModel
from typing import Callable
from playwright.sync_api import Browser


class Website(BaseModel):
  name: str
  helper: Callable[[Browser], list[str]]
