import { Request, Response } from "express";
import { queuedNames, poppedNames } from "../utils/names.js";

export default async function getQueue(req: Request, res: Response) {
  const lists = {
    queued: queuedNames,
    popped: poppedNames,
  };
  res.status(200).json({ lists });
  return;
}
