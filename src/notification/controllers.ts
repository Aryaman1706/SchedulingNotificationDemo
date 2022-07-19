import { Request, Response } from "express";
import { v4 } from "uuid";
import { redis } from "../redis/index";

const addNotification = async (req: Request, res: Response) => {
  try {
    const { notificationData, triggerTime } = req.body;
    const id = v4();

    await Promise.all([
      redis.hmset(id, { ...notificationData }),
      redis.set(`trigger_key:${id}`, id, "PXAT", triggerTime),
    ]);

    return res.status(200).json({
      status: 200,
      message: "Successfully added notification",
      data: { ...req.body },
    });
  } catch (error) {
    console.error("[notify:addNotification]", error);
    return res.status(400).json({
      status: 400,
      message: "Error occured while adding notification",
      data: null,
    });
  }
};

export { addNotification };
