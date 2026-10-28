from urllib.parse import urlparse


class SourceDetector:
    def detect(self, url: str) -> str:
        return urlparse(url).netloc or "unknown"
