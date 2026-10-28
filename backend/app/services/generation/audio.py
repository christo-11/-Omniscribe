class AudioGenerator:
    def synthesize(self, script: str) -> bytes:
        return script.encode("utf-8")
