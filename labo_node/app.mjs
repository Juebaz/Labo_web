import express from "express";
const app = express();

import { getAll } from "./services/wines.mjs"

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/wines", getAll)

app.listen(3000);
console.log("App running at localhost:3000");
