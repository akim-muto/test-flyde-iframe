import type { ServerWebSocket } from 'bun';
import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();
const server = Bun.serve({
  fetch: app.fetch,
  port: 3100,
  websocket,
});

export default app;
const topic = 'update-signal';

app.get(
  '/ws',
  upgradeWebSocket((_) => ({
    onOpen(_, ws) {
      const rawWs = ws.raw as ServerWebSocket;
      rawWs.subscribe(topic);
      console.log(`WebSocket server opened and subscribed to topic '${topic}'`);
    },
    onClose(_, ws) {
      const rawWs = ws.raw as ServerWebSocket;
      rawWs.unsubscribe(topic);
      console.log(
        `WebSocket server closed and unsubscribed from topic '${topic}'`
      );
    },
  }))
);

app.put(
  "/update",
  (c) => {
    server.publish(topic, "update")
    return c.text("ok")
  }
)

app.put(
  "/update_viewer",
  (c) => {
    server.publish(topic, "update_viewer")
    return c.text("ok")
  }
)