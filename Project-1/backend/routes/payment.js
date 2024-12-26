const express = require("express");
require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");
const Razorpay = require("razorpay");
const Booking = require("../models/Booking");

const router = express.Router();

// PayPal SDK setup
const paypalEnvironment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
);
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);

// Razorpay setup
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// PayPal Order Creation
router.post("/create-paypal-order", async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const amount = booking.totalAmount.toFixed(2); // PayPal expects amount in 2 decimal places

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Razorpay Order Creation
router.post("/create-razorpay-order", async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const amount = booking.totalAmount * 100; // Razorpay expects amount in paise

  try {
    const order = await razorpayInstance.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt#${bookingId}`,
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
