import express from "express";

import { notFound, addName, popName } from "./routes/index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/add", (req, res) => {
  addName(req, res);
});

app.post("/add", (req, res) => {
  addName(req, res);
});

app.get("/pop", (req, res) => {
  popName(req, res);
});

app.get("*", (req, res) => {
  notFound(req, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello world!");
