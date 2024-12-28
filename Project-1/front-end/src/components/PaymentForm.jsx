import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { PayPalButton } from "react-paypal-button-v2";

const PaymentForm = ({ bookingId }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);


  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const { data } = await api.post('/create-paypal-order', { bookingId });
        setPaymentDetails(data); 
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [bookingId]);

  const handlePaymentSuccess = (details, data) => {
    console.log('Payment successful:', details);
    console.log('Payment data:', data);
    
    
    api.post('/create-paypal-order', {
      bookingId,
      paymentDetails: data,
    })
      .then((response) => {
        console.log('Booking updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating booking:', error);
      });
  };

  if (!paymentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Complete Your Payment</h3>
      <PayPalButton
        amount={paymentDetails.totalAmount} 
        currency="USD" 
        onSuccess={handlePaymentSuccess}
        options={{
          clientId: "AUxZkJ_9m3UoyTr0mtijDKli48gcowYV92x65rTUbEEv8IM3LWBIruplclGepnOMAcLwdBUN4Qll7v8Q", 
        }}
      />
    </div>
  );
};

export default PaymentForm;
