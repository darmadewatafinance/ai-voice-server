
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Voice Server hidup!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu adalah AI teman ngobrol yang santai, hangat, dan suka menanggapi percakapan seperti manusia." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    const aiReply = response.data.output[0].content[0].text;

    res.json({ reply });

  } catch (error) {
    console.log(error);
    res.json({ reply: "Aduh aku lagi pusing mikir 😵 coba lagi ya..." });
  }
});

app.listen(8080, () => {
  console.log("Server jalan di port 8080");
});
