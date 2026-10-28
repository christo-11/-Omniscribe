from app.services.factcheck.factchecker import FactChecker


class FactcheckerWorker:
    def __init__(self) -> None:
        self.factchecker = FactChecker()

    def run(self, text: str) -> list[dict[str, str]]:
        return self.factchecker.check(text)
