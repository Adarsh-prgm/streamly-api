// app.js — COMPLETE. Wires the routers and the error handler together.
// Note the ORDER: routers first, then the error handler LAST.
// You do not need to change this file.

import express from "express";
import channelRoutes from "./routes/channel.routes.js";
import videoRoutes from "./routes/video.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/channels", channelRoutes);
app.use("/videos", videoRoutes);

// The error handler MUST be registered after all routes.
app.use(errorHandler);

export default app;
