const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const Vehicle = require('../models/Vehicle');
const router = express.Router();
require('dotenv').config();

// Set up PayPal environment with your client ID and secret
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;

// PayPal environment configuration
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Create PayPal Order Route
router.post('/create-order', async (req, res) => {
  const { vehicleId, quantity, userEmail } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    const totalAmount = (Vehicle.price_per_day * quantity).toFixed(2); // Total amount in dollars

    // Create an order on PayPal
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer('return=representation');
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalAmount,
          },
          description: `Vehicle Rental: ${Vehicle.make} ${Vehicle.model}`,
        },
      ],
      application_context: {
        return_url: 'http://localhost:2002/api/payment/capture-payment', // Redirect URL after payment
        cancel_url: 'http://localhost:2002/payment/cancel', // Redirect URL if payment is cancelled
      },
    });

    const order = await client.execute(orderRequest);
    res.status(200).json({ approvalLink: order.result.links[1].href }); // Return the approval link
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
});

// Capture PayPal Payment Route
router.get('/capture-payment', async (req, res) => {
  const { token } = req.query;

  try {
    // Capture payment after successful approval
    const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
    captureRequest.requestBody({});

    const capture = await client.execute(captureRequest);
    // Store payment details in your database (e.g., Payment collection)
    // You can also mark the booking as paid here.

    res.status(200).json({ message: 'Payment successful', paymentDetails: capture.result });
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    res.status(500).json({ message: 'Error capturing payment' });
  }
});

module.exports = router;
