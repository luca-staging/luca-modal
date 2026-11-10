import config from "../config/index.js";

const hits = new Map();

function createLimiter({ windowMs, max }) {
  return (req, res, next) => {
    const key = req.ip || "local";
    const now = Date.now();
    const bucket = hits.get(key) || { count: 0, reset: now + windowMs };
    if (now > bucket.reset) {
      bucket.count = 0;
      bucket.reset = now + windowMs;
    }
    bucket.count += 1;
    hits.set(key, bucket);
    if (bucket.count > max) {
      return res.status(429).json({ message: "Too many requests" });
    }
    return next();
  };
}

export const apiLimiter = createLimiter({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
});

export const strictLimiter = createLimiter({
  windowMs: config.rateLimitWindowMs,
  max: Math.max(20, Math.floor(config.rateLimitMax / 3)),
});
