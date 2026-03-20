import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cards } from "./tarot";
import { main as cronMain } from "./cron-tarot";

const app = new Hono();

Bun.cron("./cron-tarot.ts", "0 0 * * *", "tarot");

app.get("/random", () => {
  const randomFile = cards[Math.floor(Math.random() * cards.length)];

  if (!randomFile) {
    return Response.json({ error: "No cards found" }, 500);
  }

  return Response.json(randomFile);
});

app.get("/force-random", async () => {
  const body = await cronMain();
  return Response.json({ message: "Tarot card sent", body });
});

app.get("/force-set/:index", async (c) => {
  const indexStr = c.req.param("index");
  const index = parseInt(indexStr, 10);

  if (Number.isNaN(index) || index < 0 || index >= cards.length) {
    return Response.json({ error: "Invalid index" }, 400);
  }

  const body = await cronMain(cards[index]);
  return Response.json({ message: "Tarot card sent", body });
});

app.use("/public/*", serveStatic({ root: "./" }));

export default app;
