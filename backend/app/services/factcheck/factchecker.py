class FactChecker:
    def check(self, text: str) -> list[dict[str, str]]:
        return [{"claim": text[:140], "status": "needs-review"}] if text else []
