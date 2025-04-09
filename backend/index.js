const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from React
app.use(express.static(path.join(__dirname, "build")));

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Sample dummy response — replace with actual AI logic later
  return res.json({ answer: `You asked: ${prompt}` });
});

// For any other routes, serve the React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});








