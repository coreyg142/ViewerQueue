import dotenv from "dotenv";
dotenv.config();

import AuthKeyManager from "../utils/authKeyManager.js";
import { Request, Response } from "express";

export default async function verifyAuth(req: Request, res: Response) {
  const key = req.headers?.api_auth;
  const verified = typeof key === "string" ? AuthKeyManager.verifyKey(key, req.ip) : { valid: false, expiryTimeMs: -1 };
  if (verified.valid) {
    res.status(200).json({ result: "valid", expiryTimeMs: verified.expiryTimeMs });
  } else {
    res.status(200).json({ error: "Unauthorized" });
    return;
  }
}
