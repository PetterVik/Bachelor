const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'malinskogeng12@gmail.com',
    pass: 'mwwb ltsx loxq hury',
  },
});



// API-endepunkt for å sende booking-bekreftelse
app.post('/send-booking-email', async (req, res) => {
  const { name, email, subject, description, time } = req.body;

  try {
    await transporter.sendMail({
      from: '"Pure Logic" <malinskogeng@hotmail.com>',  
      to: email,   
      bcc: 'post@purelogic.no',                                
      subject: subject || "Bekreftelse på konsultasjon",
      html: `
        <h2>Hei ${name},</h2>
        <p>Takk for at du booket en gratis konsultasjon!</p>
        <p><strong>Tid:</strong> ${time}</p>
        <p><strong>Melding:</strong> ${description}</p>
        <br/>
        <p>Vi ser frem til samtalen!</p>
        <p>Hilsen,<br>Pure Logic</p>
      `
    });

    res.status(200).send("E-post sendt!");
  } catch (error) {
    console.error("Feil ved sending av e-post:", error);
    res.status(500).send("Kunne ikke sende e-post.");
  }
});

// Start serveren
app.listen(5050, () => {
  console.log("Server kjører på port 5050");
});
