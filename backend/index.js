const express = require("express");
require("dotenv").config();
require("./mongo_conn/conn");
const app = express();
const userApi = require("./routes/user");
const catApi = require("./routes/categories");
const podcastApi = require("./routes/podcast");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 6000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", userApi);
app.use("/api/v1", catApi);
app.use("/api/v1", podcastApi);

app.listen(PORT, () => {
  console.log(`${PORT} listen succesfully...`);
});
