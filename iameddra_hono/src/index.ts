import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.get("/trans", async (c) => {
  const results = await c.env.AI.run("@hf/google/gemma-7b-it", {
    messages: [
      {
        "role": "user", "content": "translate hello in 5 different languages including english"
      }
    ]

  });
  return c.json(results);
});


app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

export default app;
