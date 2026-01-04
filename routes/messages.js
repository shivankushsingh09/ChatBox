import { Router } from "express";
import { getMessages, addMessage } from "../controllers/messageController.js";

const router = Router();

router.post("/getmsg", getMessages);
router.post("/addmsg", addMessage);

export default router;
