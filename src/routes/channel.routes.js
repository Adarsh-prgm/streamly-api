// channel.routes.js — COMPLETE. A thin switchboard: URL + method -> handler.
// The last route (top-videos) points at a handler YOU implement in video.controller.js.

import { Router } from "express";
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channel.controller.js";
import { topVideos } from "../controllers/video.controller.js";

const router = Router();

router.post("/", createChannel);
router.get("/:id", getChannel);
router.patch("/:id", updateChannel);
router.delete("/:id", deleteChannel);

// Aggregation endpoint — the handler lives in video.controller.js (Task 3).
router.get("/:id/top-videos", topVideos);

export default router;
