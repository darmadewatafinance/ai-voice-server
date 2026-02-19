import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

/* ---------- CEK SERVER HIDUP ---------- */
app.get("/", (req, res) => {
  res.send("AI Voice Server hidup!");
});

/* ---------- CHAT AI ---------- */
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Kamu belum kirim pesan 😅" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: userMessage
      })
    });

    const data = await response.json();

    // Ambil teks jawaban AI dengan aman
    let reply = "AI lagi bingung 🤯 coba lagi ya...";

    try {
      reply = data.output[0].content[0].text;
    } catch (e) {
      console.log("Format jawaban berubah:", data);
    }

    res.json({ reply });

  } catch (error) {
    console.log("ERROR:", error);
    res.json({ reply: "AI kelelahan 😵 coba lagi..." });
  }
});

/* ---------- PORT RAILWAY ---------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
