// video.routes.js — COMPLETE. Wires URLs to the handlers you implement in Task 2.
// Do not change this file.

import { Router } from "express";
import {
  createVideo,
  getVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

const router = Router();

router.post("/", createVideo);
router.get("/:id", getVideo);
router.delete("/:id", deleteVideo);

export default router;
