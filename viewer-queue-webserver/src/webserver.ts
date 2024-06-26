import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import {
  notFound,
  addName,
  popName,
  getQueue,
  authenticate,
  verifyAuth,
  removeName,
  clearQueues,
  killName,
} from "./routes/index.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  },
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.set("trust proxy", true);
const port = process.env.PORT || 3000;

// app.get("/add", (req, res) => {
//   console.log("/add");
//   console.log(req.method);
//   // console.log(req.headers);
//   console.log(req.body);
//   addName(req, res, io);
// });

/**
 * @api {post} /add Add a user to the list
 * @apiName AddUser
 * @apiGroup Name

 * @apiBody {Number} name The name to add
 * @apiHeader {String} api_auth Authentication key
 * @apiExample
 * POST https://api.thatonelegion.xyz/add
 *  headers: {
 *      API_AUTH: "authkey",
 *  },
 *  body: {
 *      name: "name"
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Successfully added to the queue at position ${queuedNames.length}"
 *     }
 */
app.post("/add", (req, res) => {
  console.log("/add");
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.body);
  addName(req, res, io);
});

// app.get("/pop", (req, res) => {
//   console.log("/pop");
//   console.log(req.method);
//   // console.log(req.headers);
//   console.log(req.body);
//   popName(req, res, io);
// });

/**
 * @api {patch} /pop?random=[true/false] Pull a name from the list
 * @apiName PopName
 * @apiGroup Name
 *
 * @apiQuery {Boolean} random Pull randomly or in order
 * @apiHeader {String} api_auth Authentication key
 * @apiExample
 * PATCH https://api.thatonelegion.xyz/pop?random=true
 *  headers: {
 *      API_AUTH: "authkey",
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "result": "${name} is the next name!",
 *        "name": "${name}"
 *     }
 */
app.patch("/pop", (req, res) => {
  console.log("/pop");
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.body);
  popName(req, res, io);
});

app.patch("/kill", (req, res) => {
  console.log("/kill");
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.body);
  killName(req, res, io);
});

/**
 * @api {get} /queue Get the lists of queued and previously popped names
 * @apiName GetQueue
 * @apiGroup Name
 * @apiExample
 * GET https://api.thatonelegion.xyz/queue
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "lists" = {
 *          queued[],
 *          popped[],
 *        }
 *     }
 */
app.get("/queue", (req, res) => {
  getQueue(req, res, io);
});

app.delete("/remove", (req, res) => {
  console.log("/remove");
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.body);
  removeName(req, res, io);
});

app.post("/authenticate", (req, res) => {
  authenticate(req, res);
});

app.get("/verifyauth", (req, res) => {
  console.log("/verifyauth");
  console.log(req.method);
  verifyAuth(req, res);
});
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

app.delete("/lists", (req, res) => {
  console.log("/lists");
  console.log(req.method);
  // console.log(req.headers);
  console.log(req.body);
  clearQueues(req, res);
});

app.get("*", (req, res) => {
  notFound(req, res);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello world!");
