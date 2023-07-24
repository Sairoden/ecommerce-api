const express = require("express");
const app = express();

// Routers
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");

// ROUTES V1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

module.exports = app;
