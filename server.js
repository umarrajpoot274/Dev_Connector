const express = require("express");
const app = express();
const connectDb = require("./config/db");
const cors = require("cors");

connectDb();

app.use(express.json({ extended: false })); //body parser
app.use(cors());
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/user", require("./Routes/API/user"));
app.use("/api/auth", require("./Routes/API/auth"));
app.use("/api/profile", require("./Routes/API/profile"));
app.use("/api/posts", require("./Routes/API/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port= ${PORT}`);
});
