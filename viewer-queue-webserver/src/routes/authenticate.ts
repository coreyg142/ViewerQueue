import dotenv from "dotenv";
dotenv.config();

import AuthKeyManager from "../utils/authKeyManager.js";
import { Request, Response } from "express";

export default async function authenticate(req: Request, res: Response) {
  const password: string = req.body?.password;
  const ip = req.headers?.["cf-connecting-ip"] || req.socket.remoteAddress;
  if (password === process.env.MOD_KEY && typeof ip === "string") {
    const { authKey, time } = AuthKeyManager.genAuthKey(ip);

    res.status(200).json({ authKey, time });
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
