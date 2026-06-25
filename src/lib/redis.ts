import Redis from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    return new Redis(process.env.REDIS_URL);
  }

  // Fallback to local redis if URL not provided
  console.warn("REDIS_URL not found, using default localhost:6379");
  return new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  });
};

const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || redisClient();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis Get Error:", error);
    return null;
  }
};

export const cacheSet = async (key: string, value: any, ttl: number = 3600): Promise<void> => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (error) {
    console.error("Redis Set Error:", error);
  }
};

export const cacheDel = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis Del Error:", error);
  }
};
