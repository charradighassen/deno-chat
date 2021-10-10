import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const messages = [];
let channel = new BroadcastChannel('chat');

channel.onmessage = (event) => {
  messages.push(event.data);
};


const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Chat Server!";
  })
  .get("/messages", (context) => {
    context.response.body = messages
  })
  .post("/messages", async (context) => {
    const message = await context.request.body().value;
    messages.push(message);
    channel.postMessage(message);
    context.response.body = message;
  });

const app = new Application();
app.use(oakCors())
app.use(router.routes());
app.use(router.allowedMethods());
addEventListener("fetch",app.fetchEventHandler());