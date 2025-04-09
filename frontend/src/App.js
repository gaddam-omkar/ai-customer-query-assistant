import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("Loading...");
    console.log("Frontend sending prompt:", prompt);

    try {
      // ✅ Changed from localhost to relative path
      const res = await axios.post("/ask", { prompt });
      console.log("Frontend received response:", res);
      setResponse(res.data.answer || "🤖 No response generated.");
    } catch (err) {
      console.error("Frontend error:", err);
      if (err.response) {
        setResponse(
          `❌ Failed to get a response: ${err.response.status} - ${
            err.response.data.message || "Server error"
          }`
        );
      } else if (err.request) {
        setResponse(
          "❌ Error: No response from the server. Is the backend running?"
        );
      } else {
        setResponse("❌ Error: Could not send the request. Check your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI-Powered Customer Query Assistant</h1>
      <textarea
        placeholder="Type your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={60}
      />
      <br />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
      <div className="response-box">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;









