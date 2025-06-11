### BUILD IMAGE ###

FROM python:3.13-slim AS builder

ENV DJANGO_SETTINGS_MODULE=config.settings \
    PATH="/venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_CACHE_DIR=/root/.cache/uv \
    UV_COMPILE_BYTECODE=1 \
    UV_FROZEN=1 \
    UV_LINK_MODE=copy \
    UV_NO_MANAGED_PYTHON=1 \
    UV_PROJECT_ENVIRONMENT=/venv \
    UV_PYTHON_DOWNLOADS=never \
    UV_REQUIRE_HASHES=1 \
    UV_VERIFY_HASHES=1 \
    VIRTUAL_ENV=/venv

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

RUN <<EOT
apt-get update -y && \
apt-get install -y --no-install-recommends \
    build-essential \
    # other build dependencies here
EOT

WORKDIR /app

ARG BUILD_GROUPS=""

RUN --mount=type=cache,target=/app/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv venv $VIRTUAL_ENV && \
    uv sync --no-install-project --no-editable $BUILD_GROUPS

# Copy what's needed to run collectstatic.
COPY . .

RUN DEBUG=False ./manage.py collectstatic --noinput

### FINAL IMAGE ###

FROM python:3.13-slim-bookworm

ENV DJANGO_SETTINGS_MODULE=config.settings \
    PATH="/venv/bin:$PATH" \
    PORT=8000 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    VIRTUAL_ENV=/venv

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

WORKDIR /app

RUN <<EOT
apt-get clean -y && \
apt-get update -y && \
apt-get install -y --no-install-recommends \
	# OS dependencies, e.g. bash, db clients, etc.
    bash && \
apt-get autoremove -y && \
apt-get clean -y && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
EOT

# Copy selectively from builder to optimize final image.
# --link enables better layer caching when base image changes
COPY --link --from=builder /venv /venv
COPY --link --from=builder /app /app
