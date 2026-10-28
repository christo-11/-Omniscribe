class Storage:
    def put(self, key: str, value: bytes) -> str:
        return f"memory://{key}"
