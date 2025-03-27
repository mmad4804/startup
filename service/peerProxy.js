const { WebSocketServer } = require("ws");

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on("connection", (socket) => {
    socket.isAlive = true;

    socket.on("message", function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    socket.on("pong", () => {
      socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 100000);
}

module.exports = { peerProxy };
