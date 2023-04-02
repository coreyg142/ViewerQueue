import dotenv from "dotenv";
dotenv.config();

import AuthKeyManager from "../utils/authKeyManager.js";
import { Request, Response } from "express";

export default async function authenticate(req: Request, res: Response) {
  const password: string = req.body?.password;
  if (password === process.env.MOD_KEY) {
    const key = AuthKeyManager.genAuthKey(req.ip);

    res.status(200).json({ key });
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
