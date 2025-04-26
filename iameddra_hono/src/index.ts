import { Hono } from "hono";
const app
  = new Hono<{ Bindings: CloudflareBindings }>();

//search MEDDRA terms by code 
app.get("/search", async (c) => {
  const code = c.req.query('code')
  const apikey = c.req.query('apikey')
  const url: string = await "http%3A%2F%2Fpurl.bioontology.org%2Fontology%2FMEDDRA%2F" + code;
  try {
    const response = await fetch("https://data.bioontology.org/ontologies/MEDDRA/classes/" + url + "?display=all&apikey=" + apikey)
    console.log('Response:', response.url)
    if (!response.ok) {
      return c.text(`Request error: ${response.status}`, response.status)
    }
    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error('Error while fetching data:', error)
    return c.text('Server error while retrieving data', 500)
  }
});
// use a mistral IA 
app.get("/trans", async (c) => {
  const results = await c.env.AI.run("@hf/mistral/mistral-7b-instruct-v0.2", {
    messages: [
      {
        "role": "user", "content": "translte Infarkt in 5 languanges including english format response in json"
      }
    ]
  });
  return c.text(results.response);
});


app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

export default app;
