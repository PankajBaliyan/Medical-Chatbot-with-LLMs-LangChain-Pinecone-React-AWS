# Use official slim Python base image
FROM python:3.12-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies (for torch, sentence-transformers, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*

# Copy requirements file
# (Rename if you want; HF expects `requirements.txt` by default)
COPY hf_requirements.txt requirements.txt

# Upgrade pip and install dependencies
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Copy project files into container
COPY . .

# Expose FastAPI port
EXPOSE 7860

# Define environment variables (optional defaults)
ENV PORT=7860
ENV PYTHONUNBUFFERED=1

# Launch FastAPI app
# 👇 Updated entry path to match your project layout (`api/main.py`)
CMD ["python", "-m", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "7860"]