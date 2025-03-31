// Services/booking-service.js
class BookingService {
    async sendConfirmationEmail(bookingData) {
      // Email logic (using Nodemailer, etc.)
      console.log(`Sent confirmation to ${bookingData.email}`);
    }
  }
  module.exports = new BookingService();
  