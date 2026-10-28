import sys
from pathlib import Path

if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.routes import router as api_router

app = FastAPI(title="Omniscribe API", version="0.1.0")
app.include_router(health_router)
app.include_router(api_router, prefix="/api")


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "omniscribe", "status": "online"}
