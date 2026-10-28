import httpx


class SourceConnector:
    def fetch(self, url: str) -> dict[str, str]:
        response = httpx.get(url, timeout=10, follow_redirects=True)
        response.raise_for_status()
        return {"url": url, "content": response.text}
