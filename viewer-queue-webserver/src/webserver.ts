import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { notFound, addName, popName, getQueue } from "./routes/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/add", (req, res) => {
  addName(req, res, io);
});

app.post("/add", (req, res) => {
  addName(req, res, io);
});

app.post("/pop", (req, res) => {
  popName(req, res, io);
});

app.get("/queue", (req, res) => {
  getQueue(req, res);
});

app.get("*", (req, res) => {
  notFound(req, res);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello world!");
