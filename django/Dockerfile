# ==========================================
# Builder Stage
# ==========================================
FROM python:3.12-slim AS builder

# Get 'uv' binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

# Copy lockfile and pyproject.toml
COPY pyproject.toml uv.lock ./

# Install dependencies in a virtual environment
RUN uv sync --frozen --no-install-project --no-dev

# Copy application code
COPY . .

# Final sync to include project files
RUN uv sync --frozen --no-dev


# ==========================================
# Final Runtime Stage
# ==========================================
FROM python:3.12-slim

# Set optimal Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Install strictly the necessary system dependencies (no bloat)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsm6 \
    libxext6 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Copy the pre-built virtual environment and application code
COPY --from=builder /app /app

# Expose port and run production server
EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
