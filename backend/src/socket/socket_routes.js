import chatSocket from "./chat.js";

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected, waiting for module assignment...");

    // Only attach socket handlers when client explicitly requests them
    socket.on("join:chat", () => {
      console.log("User joined chat module");
      chatSocket(io, socket);
    });

    socket.on("join:game", () => {
      console.log("User joined game module");
      gameSocket(io, socket);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
