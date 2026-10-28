from uuid import uuid4

from app.models.csobject import StoryDraft


class Orchestrator:
    def __init__(self) -> None:
        self.stories: dict[str, StoryDraft] = {}

    def create_story(self, source_url: str) -> StoryDraft:
        story = StoryDraft(
            id=str(uuid4()),
            source_url=source_url,
            title="New story from source",
            status="ingesting",
        )
        self.stories[story.id] = story
        return story

    def list_stories(self) -> list[StoryDraft]:
        return list(self.stories.values())

    def get_story(self, story_id: str) -> StoryDraft | None:
        return self.stories.get(story_id)

    def update_story(self, story_id: str, updates: dict[str, str]) -> StoryDraft | None:
        story = self.stories.get(story_id)
        if story is None:
            return None
        updated = story.model_copy(update=updates)
        self.stories[story_id] = updated
        return updated


orchestrator = Orchestrator()
