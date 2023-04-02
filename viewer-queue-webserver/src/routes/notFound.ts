import { Request, Response } from "express";

export default function notFound(req: Request, res: Response) {
  res.status(404).send("404 - Endpoint not found");
}
