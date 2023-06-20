// Libraries
const morgan = require("morgan");

// Express
const express = require("express");
const app = express();

// Middleware Import
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(morgan("tiny"));
app.use(express.json());

// Routers
const authRouter = require("./routes/authRouter");

// Routes
app.get("/", (req, res) => {
  res.send("e-commerce api");
});
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;


