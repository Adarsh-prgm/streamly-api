# Streamly API

A small **Mongoose API module** for a streaming platform — channels and videos.

The **Channel module is already built and working** — it's your reference. Your job is to
build the **Video module** in the same shape, add one **aggregation endpoint**, and complete the
**central error handler**.

```
Express  ──►  routes/  ──►  controllers/  ──►  Mongoose models  ──►  MongoDB
                                   │
                                   └── on any throw ──►  middleware/errorHandler.js
```

**Tech:** Node (ESM) · Express 4 · Mongoose 8 · MongoDB (Atlas or local)

---

## What's already done for you (study, don't change)

- **`src/app.js` / `src/server.js`** — Express wiring + MongoDB connection.
- **`src/models/channel.model.js`** — a complete schema with validators (your model reference).
- **`src/controllers/channel.controller.js`** — complete CRUD handlers (your handler-pattern reference).
- **`src/routes/*.routes.js`** — the URL → handler switchboards, already wired.
- **`src/seed.js`** — inserts one channel + five videos so your aggregation endpoint has data.

## What you build (four `TODO` files)

| File | Task |
|------|------|
| `src/models/video.model.js` | **Task 1** — the Video schema + validators |
| `src/controllers/video.controller.js` | **Task 2** — `createVideo` / `getVideo` / `deleteVideo`; **Task 3** — `topVideos` aggregation |
| `src/middleware/errorHandler.js` | **Task 4** — map `ValidationError`, `CastError`, and `11000` to the right status |

> Copy the *shape* of the Channel files — do not copy them literally. Adapt the pattern to videos.

---

## The API (once you finish)

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/channels` | create a channel *(provided)* |
| `GET` | `/channels/:id` | get one channel *(provided)* |
| `POST` | `/videos` | create a video *(Task 2)* |
| `GET` | `/videos/:id` | get one video *(Task 2)* |
| `DELETE` | `/videos/:id` | delete a video *(Task 2)* |
| `GET` | `/channels/:id/top-videos` | top 10 videos by views *(Task 3)* |

---

## Run it locally

**1. Install dependencies**

```bash
npm install
```

**2. Set your connection string** — copy `.env.example` to `.env` and fill in `MONGODB_URI`
(use the Atlas cluster from the Module 3 setup lesson, or a local `mongod`).

```bash
cp .env.example .env
```

**3. Seed data, then run** (after you finish `video.model.js`):

```bash
npm run seed     # inserts a channel + videos, prints the channel id
npm run dev      # starts the API on http://localhost:3001
```

**4. Test your endpoints** with curl (or Postman):

```bash
# top videos (use the channel id the seed printed)
curl http://localhost:3001/channels/<CHANNEL_ID>/top-videos

# validation error -> 400
curl -X POST http://localhost:3001/videos -H "Content-Type: application/json" -d '{}'

# cast error -> 400
curl http://localhost:3001/videos/not-an-id

# duplicate slug -> 409  (run twice)
curl -X POST http://localhost:3001/videos -H "Content-Type: application/json" \
  -d '{"title":"A","slug":"dup","channelId":"<CHANNEL_ID>"}'
```

---

## Definition of done

- `npm run seed` succeeds (your Video model works).
- `GET /channels/:id/top-videos` returns up to 10 videos, highest `views` first.
- Creating/reading/deleting a video works, with correct status codes (`201` / `200` / `204` / `404`).
- A missing required field returns **400**, a bad id returns **400**, a duplicate slug returns **409**.
