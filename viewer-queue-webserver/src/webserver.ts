import express from "express";

import { notFound } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  notFound(req, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello world!");
