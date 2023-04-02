import dotenv from "dotenv";
import { Request, Response } from "express";
import { Server } from "socket.io";
import { popName as pop } from "../utils/names.js";
dotenv.config();

export default async function popName(req: Request, res: Response, io: Server) {
  const key = req.body?.key ? req.body?.key : req.query?.key;
  if (key !== process.env.WRITE_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const result = await pop();
  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.status(200).json({ result: result.result });
  io.emit("name-popped", result.name);
}
