from . import environ
from flashtext import KeywordProcessor


KEYWORDS = KeywordProcessor()
if not environ.ENV.exist("KEYWORDS"):
  raise EnvironmentError("KEYWORDS Environment is not set")

for keyword in str(environ.ENV.get("KEYWORDS")).split(","):
  KEYWORDS.add_keyword(keyword.strip())
