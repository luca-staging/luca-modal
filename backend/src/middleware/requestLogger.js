export default function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    if (process.env.NODE_ENV === "production") return;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
}
