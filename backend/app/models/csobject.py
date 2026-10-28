from datetime import datetime, timezone
from pydantic import BaseModel, Field


class StoryDraft(BaseModel):
    id: str
    source_url: str
    title: str
    body: str = ""
    status: str = "queued"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
