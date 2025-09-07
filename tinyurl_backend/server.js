const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Mount for POST /api/shorten
app.use("/api", require("./routes/urlRoute"));

// Mount for GET /:shortCode
app.use("/", require("./routes/urlRoute"));

app.get("/", (req, res) => {
  res.send("TinyURL backend is live!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
