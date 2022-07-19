import Redis from "ioredis";

const config = {
  host: "localhost",
  port: 6379,
  username: "default",
};

const redis = new Redis(config);
const subscriber = new Redis(config);

export { redis, subscriber };
