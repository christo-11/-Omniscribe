from app.services.video.video_renderer import VideoRenderer


class RenderWorker:
    def __init__(self) -> None:
        self.renderer = VideoRenderer()

    def run(self, script: str) -> str:
        return self.renderer.render(script)
