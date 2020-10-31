const express = require("express");
const app = express();
const connectDB = require("./helper/db");
const path = require("path");
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/user/register", require("./routes/User/register"));
app.use("/api/user/auth", require("./routes/User/auth"));
app.use("/api/user/referral", require("./routes/User/referralcode"));
app.use("/api/user/forgotpassword", require("./routes/User/forgotpassword"));

app.use("/api/admin/register", require("./routes/Admin/register"));
app.use("/api/admin/auth", require("./routes/Admin/auth"));
app.use("/api/admin/user", require("./routes/Admin/user"));
const PORT = process.env.PORT || 5001;

app.use(express.static("client/build"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
