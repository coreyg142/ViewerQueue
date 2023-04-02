import { Request, Response } from "express";
import { queuedNames, poppedNames } from "../utils/names.js";
import { Server } from "socket.io";

export default async function getQueue(req: Request, res: Response, io: Server) {
  const lists = {
    queued: queuedNames,
    popped: poppedNames,
  };
  res.status(200).json({ lists });
  return;
}
