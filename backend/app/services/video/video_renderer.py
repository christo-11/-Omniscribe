class VideoRenderer:
    def render(self, script: str) -> str:
        return f"render://pending/{abs(hash(script))}"
