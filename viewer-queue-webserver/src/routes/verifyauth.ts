import dotenv from "dotenv";
dotenv.config();

import AuthKeyManager from "../utils/authKeyManager.js";
import { Request, Response } from "express";

export default async function verifyAuth(req: Request, res: Response) {
  const key = req.headers?.api_auth;
  // console.log(req.headers);
  const ip = req.headers?.["cf-connecting-ip"] || req.socket.remoteAddress;

  const verified =
    typeof key === "string" && typeof ip === "string"
      ? AuthKeyManager.verifyKey(key, ip)
      : { valid: false, expiryTimeMs: -1, message: "Weirdness" };
  // console.log(verified.message);
  if (verified.valid) {
    console.log(`Verified auth key for ${ip}`);
    res.status(200).json({ result: "valid", expiryTimeMs: verified.expiryTimeMs });
  } else {
    console.log(`Failed to verify auth key for ${ip}`);
    res.status(200).json({ error: "Unauthorized" });
    return;
  }
}
