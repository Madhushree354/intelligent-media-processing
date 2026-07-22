console.log("Loading redis.js");

const IORedis = require("ioredis");

const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log(" Redis Connected");
});

redis.on("error", (err) => {
  console.log(" Redis Error:", err.message);
});

module.exports = redis;