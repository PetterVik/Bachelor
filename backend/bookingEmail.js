const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const sendConfirmationEmail = async (formData, selectedSlot) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or your preferred email provider
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: '"Your Company" <your-email@gmail.com>',
    to: formData.email,
    subject: "Booking Confirmation",
    text: `Hi ${formData.name},\n\nThank you for booking a consultation.\n\nDetails:\nDate & Time: ${selectedSlot.start}\nSubject: ${formData.subject}\nDescription: ${formData.description}\n\nBest regards,\nYour Company`,
    html: `<p>Hi ${formData.name},</p>
           <p>Thank you for booking a consultation.</p>
           <p><strong>Details:</strong></p>
           <ul>
             <li><strong>Date & Time:</strong> ${selectedSlot.start}</li>
             <li><strong>Subject:</strong> ${formData.subject}</li>
             <li><strong>Description:</strong> ${formData.description}</li>
           </ul>
           <p>Best regards,<br>Your Company</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

router.post("/send-email", async (req, res) => {
  const { formData, selectedSlot } = req.body;

  try {
    await sendConfirmationEmail(formData, selectedSlot);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending email.");
  }
});

module.exports = router;
