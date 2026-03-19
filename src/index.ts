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

app.get("/force", async () => {
  await cronMain();
  return Response.json({ message: "Tarot card sent" });
});

app.use("/public/*", serveStatic({ root: "./" }));

export default app;
