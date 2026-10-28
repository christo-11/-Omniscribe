from app.services.ingest.connectors import SourceConnector


class IngestionWorker:
    def __init__(self, connector: SourceConnector | None = None) -> None:
        self.connector = connector or SourceConnector()

    def run(self, url: str) -> dict[str, str]:
        return self.connector.fetch(url)
