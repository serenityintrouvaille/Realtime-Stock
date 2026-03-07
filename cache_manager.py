"""Cache manager for news and stock data."""
import json
import os
from datetime import datetime, timedelta
from typing import Any, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CACHE_DIR = "cache"
os.makedirs(CACHE_DIR, exist_ok=True)

class CacheManager:
    """Simple file-based cache with TTL."""

    def __init__(self, cache_dir: str = CACHE_DIR):
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)

    def _get_cache_path(self, key: str) -> str:
        """Get cache file path for a key."""
        return os.path.join(self.cache_dir, f"{key}.json")

    def get(self, key: str, ttl_minutes: int = 60) -> Optional[Any]:
        """Get value from cache if not expired."""
        cache_path = self._get_cache_path(key)

        if not os.path.exists(cache_path):
            logger.info(f"Cache miss: {key}")
            return None

        try:
            with open(cache_path, "r") as f:
                data = json.load(f)

            # Check if expired
            timestamp = datetime.fromisoformat(data.get("timestamp", ""))
            if datetime.now() - timestamp > timedelta(minutes=ttl_minutes):
                logger.info(f"Cache expired: {key}")
                os.remove(cache_path)
                return None

            logger.info(f"Cache hit: {key}")
            return data.get("value")

        except Exception as e:
            logger.error(f"Cache read error: {e}")
            return None

    def set(self, key: str, value: Any) -> bool:
        """Store value in cache."""
        try:
            cache_path = self._get_cache_path(key)
            data = {
                "timestamp": datetime.now().isoformat(),
                "value": value,
            }

            with open(cache_path, "w") as f:
                json.dump(data, f)

            logger.info(f"Cache set: {key}")
            return True

        except Exception as e:
            logger.error(f"Cache write error: {e}")
            return False

    def clear(self) -> None:
        """Clear all cache."""
        try:
            for file in os.listdir(self.cache_dir):
                if file.endswith(".json"):
                    os.remove(os.path.join(self.cache_dir, file))
            logger.info("Cache cleared")
        except Exception as e:
            logger.error(f"Cache clear error: {e}")

class RateLimiter:
    """Simple rate limiter."""

    def __init__(self):
        self.calls = {}

    def is_allowed(self, key: str, max_calls: int, window_seconds: int) -> bool:
        """Check if call is allowed."""
        now = datetime.now().timestamp()

        if key not in self.calls:
            self.calls[key] = []

        # Remove old calls
        self.calls[key] = [
            call_time for call_time in self.calls[key]
            if now - call_time < window_seconds
        ]

        # Check limit
        if len(self.calls[key]) < max_calls:
            self.calls[key].append(now)
            return True

        logger.warning(f"Rate limit exceeded: {key}")
        return False

# Global instances
cache_manager = CacheManager()
rate_limiter = RateLimiter()

if __name__ == "__main__":
    # Test cache
    print("Testing cache manager...")
    cache_manager.set("test_key", {"data": "test_value"})
    value = cache_manager.get("test_key")
    print(f"Cached value: {value}")

    # Test rate limiter
    print("\nTesting rate limiter...")
    limiter = RateLimiter()
    for i in range(5):
        allowed = limiter.is_allowed("api_call", max_calls=3, window_seconds=60)
        print(f"Call {i + 1}: {'Allowed' if allowed else 'Blocked'}")
