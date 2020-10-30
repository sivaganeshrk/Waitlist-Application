const express = require("express");
const app = express();
const connectDB = require("./helper/db");
const path = require("path");
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/user/register", require("./routes/User/register"));

const PORT = process.env.PORT || 5001;

app.use(express.static("client/build"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
