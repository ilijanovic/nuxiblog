import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080, path: "ws://localhost:8080/" });

export const socketService = {
  send(data: any) {
    wss.on("connection", (ws) => {
      ws.send(data);
    });
  },
};
