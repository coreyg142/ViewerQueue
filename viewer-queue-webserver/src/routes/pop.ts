import dotenv from "dotenv";
import { Request, Response } from "express";
import { Server } from "socket.io";
import { popName as pop } from "../utils/names.js";
import AuthKeyManager from "../utils/authKeyManager.js";
dotenv.config();

export default async function popName(req: Request, res: Response, io: Server) {
  const method = req.method;
  const key = method === "DELETE" ? req.headers?.key : req.query?.key;
  if (
    (method === "GET" && key === process.env.WRITE_KEY) ||
    (method === "DELETE" && typeof key === "string" && AuthKeyManager.verifyKey(key, req.ip))
  ) {
    const result = await pop();
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({ result: result.result });
    io.emit("name-popped", result.name);
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
