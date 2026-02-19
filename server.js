const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// endpoint test
app.get("/", (req, res) => {
  res.send("AI Voice Server hidup!");
});

// endpoint chat ke AI
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Kamu adalah teman ngobrol yang hangat dan santai. Balas dengan pendek dan natural.\nUser: ${userMessage}`
      })
    });

    const data = await response.json();

    const reply = data.output_text || "Aku lagi bingung menjawab 😅";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Maaf aku lagi error sebentar..." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});
