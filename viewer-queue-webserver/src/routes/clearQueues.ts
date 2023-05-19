import dotenv from "dotenv";
import { Request, Response } from "express";
import { clearQueues as clear } from "../utils/names.js";
import AuthKeyManager from "../utils/authKeyManager.js";
dotenv.config();

export default async function clearQueues(req: Request, res: Response) {
  const key = req.headers?.api_auth;
  // console.log(key);
  const ip = req.headers?.["cf-connecting-ip"] || req.socket.remoteAddress;
  const verified =
    typeof key === "string" && typeof ip === "string" ? AuthKeyManager.verifyKey(key, ip) : { valid: false };
  console.log(verified);
  if (!verified.valid) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const filterParam = req.query?.filter;
  let filter: string = filterParam?.toString() ?? "prev";
  if (filter !== "all" && filter !== "pool" && filter !== "prev") filter = "prev";
  clear(filter);
  res.status(200).json({ message: "queues cleared" });
}
