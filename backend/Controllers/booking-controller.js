// Controllers/booking-controller.js
const bookingService = require('../Services/booking-service');

exports.createBooking = async (req, res) => {
  try {
    await bookingService.sendConfirmationEmail(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
};
