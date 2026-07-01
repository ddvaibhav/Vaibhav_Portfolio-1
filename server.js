const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { Resend } = require("resend"); // ✅ import resend

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(__dirname));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Mail sending route
app.post("/sendmail", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    console.log("📤 Sending email via Resend...");
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // default verified sender
      to: "vaibhavdaspute12@gmail.com", // receiver email
      subject: "Portfolio Inquiry - Vaibhav Daspute",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });

    console.log("✅ Email sent successfully:", data);
    return res.status(200).send("✅ Message sent successfully!");
  } catch (error) {
    console.error("❌ Resend mail error:", error);
    return res.status(500).send("❌ Failed to send message");
  }
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on PORT: ${PORT}`));
