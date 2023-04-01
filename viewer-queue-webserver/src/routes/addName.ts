import dotenv from "dotenv";
dotenv.config();

import { addName as add } from "../utils/names.js";
import { Request, Response } from "express";

export default async function addName(req: Request, res: Response) {
  const name = req.body?.name ? req.body?.name : req.query?.name;
  const key = req.body?.key ? req.body?.key : req.query?.key;
  if (key !== process.env.WRITE_KEY) {
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
  return;
}
