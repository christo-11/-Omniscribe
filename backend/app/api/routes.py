from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl

from app.models.csobject import StoryDraft
from app.workers.orchestrator import orchestrator

router = APIRouter(tags=["stories"])


class IngestRequest(BaseModel):
    url: HttpUrl


class StoryUpdate(BaseModel):
    title: str | None = None
    body: str | None = None
    status: str | None = None


@router.get("/stories", response_model=list[StoryDraft])
def list_stories() -> list[StoryDraft]:
    return orchestrator.list_stories()


@router.post("/stories", response_model=StoryDraft)
def create_story(request: IngestRequest) -> StoryDraft:
    return orchestrator.create_story(str(request.url))


@router.get("/stories/{story_id}", response_model=StoryDraft)
def get_story(story_id: str) -> StoryDraft:
    story = orchestrator.get_story(story_id)
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")
    return story


@router.patch("/stories/{story_id}", response_model=StoryDraft)
def update_story(story_id: str, updates: StoryUpdate) -> StoryDraft:
    story = orchestrator.update_story(
        story_id,
        updates.model_dump(exclude_none=True),
    )
    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")
    return story
