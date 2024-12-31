import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token'); // Get token from URL

    if (token) {
      const capturePayment = async () => {
        try {
          const response = await axios.get(`http://localhost:2002/api/payment/capture-payment?token=${token}`);
          console.log('Payment successful:', response.data);
        } catch (error) {
          console.error('Error capturing payment:', error);
        }
      };

      capturePayment();
    }
  }, []);

  return <div>Processing your payment...</div>;
};

export default PaymentSuccess;
