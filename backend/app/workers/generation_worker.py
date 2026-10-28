from app.services.generation.article import ArticleGenerator


class GenerationWorker:
    def __init__(self) -> None:
        self.generator = ArticleGenerator()

    def run(self, brief: str) -> str:
        return self.generator.generate(brief)
