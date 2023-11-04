const express = require("express");
const connectDB = require("./database/connection");
const userRouter = require("./routes/user.js");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./routes/user.js"));

app.listen(5500, () => {
  console.log("Server started on PORT: 5500");
});
