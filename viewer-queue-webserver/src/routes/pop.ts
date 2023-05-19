import dotenv from "dotenv";
import { Request, Response } from "express";
import { Server } from "socket.io";
import { popName as pop, popSpecificName } from "../utils/names.js";
import AuthKeyManager from "../utils/authKeyManager.js";
dotenv.config();

export default async function popName(req: Request, res: Response, io: Server) {
  const method = req.method;
  const key = method === "PATCH" ? req.headers?.api_auth : req.query?.key;
  const name = req.body?.name;
  const random = req.query?.random === "true";
  const ip = req.headers?.["cf-connecting-ip"] || req.socket.remoteAddress;
  const verified =
    typeof key === "string" && typeof ip === "string" ? AuthKeyManager.verifyKey(key, ip) : { valid: false };

  if ((method === "GET" && key === process.env.WRITE_KEY) || (method === "PATCH" && verified.valid)) {
    let result;
    if (!name) {
      result = await pop(random);
    } else {
      result = await popSpecificName(name);
    }
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({ result: result.result, name: result.name });
    io.emit("name-popped", result.name);
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
