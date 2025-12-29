const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

app.use("/api/admin", require("./routes/admin"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/gallery", require("./routes/gallery"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
