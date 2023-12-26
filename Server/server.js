require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/auth");
const app = express();
const port = process.env.PORT; // 5000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db!"))
  .catch((err) => console.log(err));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5000",
      "http://localhost:8081",
      "http://localhost:4200",
    ],
  })
);
app.use(express.json());
app.use("/auth", router);


app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
