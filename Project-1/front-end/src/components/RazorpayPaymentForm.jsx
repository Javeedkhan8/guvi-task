import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const RazorpayPaymentForm = ({ bookingId }) => {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const createOrder = async () => {
      const { data } = await api.post('/create-order', { bookingId });
      setOrderId(data.id);
    };

    createOrder();
  }, [bookingId]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_JHrZGfRIPK3PfS", // Razorpay key
      amount: 1000, // Total amount in paise
      currency: 'INR',
      order_id: orderId,
      handler: function (response) {
        // Handle the payment success
        console.log(response);
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Bangalore, India',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPaymentForm;