import { subscriber, redis } from "../redis/index";

(async () => {
  await subscriber.subscribe("__keyevent@0__:expired");
  console.log(`Subscribed to expired key event`);

  subscriber.on("message", async (channel: string, message: string) => {
    if (
      channel.trim() === "__keyevent@0__:expired" &&
      message.startsWith("trigger_key:")
    ) {
      const id = message.split(":")[1].trim();
      const notificationData = await redis.hgetall(id);
      await redis.del(id);

      // Send Notification
      console.log("Notification Data", notificationData);
    }
  });
})();
