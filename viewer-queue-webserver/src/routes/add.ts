import dotenv from "dotenv";
dotenv.config();

import { addName as add } from "../utils/names.js";
import { Request, Response } from "express";
import { Server } from "socket.io";
import AuthKeyManager from "../utils/authKeyManager.js";

export default async function addName(req: Request, res: Response, io: Server) {
  const method: string = req.method;
  const name: string = method === "POST" ? req.body?.name : req.query?.name;
  const key: string = method === "POST" ? req.body?.key : req.query?.key;
  if (method === "GET" && key !== process.env.WRITE_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else if (method === "POST" && !AuthKeyManager.verifyKey(key)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!name) {
    res.status(400).json({ error: "No name provided" });
    return;
  }

  const result = await add(name);
  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.status(200).json({ result: result.result });
  io.emit("name-added", name);
  return;
}
