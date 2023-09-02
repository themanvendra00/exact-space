const express = require("express");
const cors = require("cors");
const path = require("path");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/submit", async (req, res) => {
  const payload = req.body.data;
  try {
    const parsedData = JSON.parse(payload);
    res.json(parsedData);
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON format" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
