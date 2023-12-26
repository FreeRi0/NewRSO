//imports//
require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const port = process.env.PORT; // 3000;
const API_SERVICE_URL = "http://localhost:5000/api/v1/login";

//middleware//
app.use(
  cors({
    exposedHeaders: "*",
  })
);

//routes
app.use(
  "/check",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
  })
);

//start server
app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
