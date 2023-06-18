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

app.get("/", (req, res) => {
  res.send("e-commerce api");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
