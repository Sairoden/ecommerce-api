const express = require("express");
const app = express();

// Routers
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

// Middlewares

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

module.exports = app;
