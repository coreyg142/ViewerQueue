import dotenv from "dotenv";
dotenv.config();

import { addName as add } from "../utils/names.js";
import { Request, Response } from "express";
import { Server } from "socket.io";
import AuthKeyManager from "../utils/authKeyManager.js";

export default async function addName(req: Request, res: Response, io: Server) {
  const method: string = req.method;
  const name = method === "POST" ? req.body?.name : req.query?.name;
  const key = method === "POST" ? req.headers?.api_auth : req.query?.key;
  const ip = req.headers?.["cf-connecting-ip"] || req.socket.remoteAddress;
  const verified =
    typeof key === "string" && typeof ip === "string" ? AuthKeyManager.verifyKey(key, ip) : { valid: false };

  if ((method === "GET" && key === process.env.WRITE_KEY) || (method === "POST" && verified.valid)) {
    if (!name) {
      res.status(400).json({ error: "No name provided" });
      return;
    } else if (typeof name === "string") {
      const result = await add(name);
      if (result.error) {
        res.status(400).json({ error: result.error });
        return;
      }
      res.status(200).json({ result: result.result });
      if (name !== "testSet") io.emit("name-added", name);
      return;
    } else {
      res.status(400).json({ error: "Name must be a string" });
      return;
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
