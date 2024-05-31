import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const server = createServer(app);
const PORT = 3000;
const io = new Server(server);

app.use(express.json());

const __dirname = path.resolve();

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  setInterval(() => {
    let options = { timeStyle: "medium", hour12: true };
    let date = new Date().toLocaleTimeString("en-US", options);
    // console.log("data");
    // socket.send(date);
    io.emit("mess", date);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("user disconnected.");
  });
});

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
