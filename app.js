// Libraries
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Express
const express = require("express");
const app = express();

// Middleware Import
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
const routes = require("./routes");
app.use(routes);

app.get("/", (req, res) => {
  res.send("Welcome to the Dead City");
});
app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("Welcome to the Dead City");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;

// 21
