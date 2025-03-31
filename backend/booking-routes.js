// Routes/booking-routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/booking-controller');

router.post('/', bookingController.createBooking);
module.exports = router;
