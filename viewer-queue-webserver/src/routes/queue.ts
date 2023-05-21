import { Request, Response } from "express";
import { queuedNames, poppedNames, nameGraveyard } from "../utils/names.js";
import { Server } from "socket.io";

export default async function getQueue(req: Request, res: Response, io: Server) {
  const lists = {
    queued: queuedNames,
    popped: poppedNames,
    graveyard: nameGraveyard,
  };
  res.status(200).json({ lists });
  return;
}
