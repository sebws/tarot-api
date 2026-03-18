import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cards } from "./tarot";

const app = new Hono();

app.get("/random", () => {
  const randomFile = cards[Math.floor(Math.random() * cards.length)];

  if (!randomFile) {
    return Response.json({ error: "No cards found" }, 500);
  }

  return Response.json(randomFile);
});

app.use("/public/*", serveStatic({ root: "./" }));

export default app;
