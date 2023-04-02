import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { notFound, addName, popName, getQueue, authenticate } from "./routes/index.js";
import { clearQueues } from "./utils/names.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.set("trust proxy", true);
const port = process.env.PORT || 3000;

app.get("/add", (req, res) => {
  addName(req, res, io);
});

app.post("/add", (req, res) => {
  addName(req, res, io);
});

app.get("/pop", (req, res) => {
  popName(req, res, io);
});
app.delete("/pop", (req, res) => {
  popName(req, res, io);
});

app.get("/queue", (req, res) => {
  getQueue(req, res, io);
});

app.post("/authenticate", (req, res) => {
  authenticate(req, res);
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * Below section for development purposes only. Remove for production.
 */
app.delete("/clearqueues", (req, res) => {
  clearQueues();
  res.status(200).json({ message: "queues cleared" });
});

app.get("*", (req, res) => {
  notFound(req, res);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello world!");
