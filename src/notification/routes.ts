import { Router } from "express";
import { addNotification } from "./controllers";

const router = Router();

router.post("/add", addNotification);

export default router;
