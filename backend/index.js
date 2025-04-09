const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  console.log("Backend received prompt:", prompt);

  let fakeResponse = "";

  if (prompt.toLowerCase().includes("hello")) {
    fakeResponse = "Hi there! How can I help you today?";
  } else if (prompt.toLowerCase().includes("price")) {
    fakeResponse = "Our product pricing starts at just $49/month.";
  } else {
    fakeResponse = "Thank you for your query. We'll get back to you shortly!";
  }

  console.log("Backend sending response:", fakeResponse);
  res.status(200).json({ answer: fakeResponse });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});







