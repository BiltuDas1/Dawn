FROM mcr.microsoft.com/playwright/python:v1.57.0-noble AS builder

# Install Poetry and generate requirements.txt from it
WORKDIR /app
RUN pip install poetry
RUN poetry self add poetry-plugin-export
COPY pyproject.toml poetry.lock ./
RUN poetry export --without-hashes -f requirements.txt --output requirements.txt


FROM mcr.microsoft.com/playwright/python:v1.57.0-noble

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app
COPY --from=builder /app/requirements.txt .

# Install all the required packages
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Creating Cuckoo filter temporary file
RUN touch cuckoo.bin && chown pwuser:pwuser cuckoo.bin && chmod 644 cuckoo.bin

USER pwuser

ENV PRODUCTION=true
LABEL org.opencontainers.image.authors="Biltu Das <billionto@gmail.com>"
LABEL org.opencontainers.image.licenses="The Unlicense"
LABEL org.opencontainers.image.source=https://github.com/BiltuDas1/Dawn

CMD ["python", "main.py"]
