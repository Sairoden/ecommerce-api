const express = require("express");
const app = express();

// Routers
const authRouter = require("./authRouter");

app.use("/api/v1/auth", authRouter);

module.exports = app;
