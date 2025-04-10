// emailService.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-booking-email", async (req, res) => {
  const { name, email, subject, description, time } = req.body;

  console.log("📩 Forespørsel mottatt fra frontend:", req.body);

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Bekreftelse: Konsultasjon hos Pure Logic`,
    text: `
Hei ${name},

Takk for at du har booket en 30 minutters konsultasjon.

📅 Tidspunkt: ${time}
📌 Emne: ${subject}
📝 Melding: ${description}

Vi gleder oss til å snakke med deg!

Med vennlig hilsen,
Pure Logic
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-post sendt til:", email);
    res.status(200).json({ message: "E-post sendt!" });
  } catch (error) {
    console.error("❌ Feil ved sending av e-post:", error.message);
    res.status(500).json({ message: "Feil ved sending av e-post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
