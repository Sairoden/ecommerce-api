const express = require("express");
const app = express();

// Routers
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

// Middlewares

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
