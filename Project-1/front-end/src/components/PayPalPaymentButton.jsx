import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PayPalPaymentButton = ({ vehicleId, quantity, userEmail }) => {
  const [approvalLink, setApprovalLink] = useState('');

  // Create PayPal order by calling the backend
  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await axios.post('http://localhost:2002/api/payment/create-order', {
          vehicleId,
          quantity,
          userEmail,
        });
        setApprovalLink(response.data.approvalLink); // Set the approval link from the response
      } catch (error) {
        console.error('Error creating PayPal order:', error);
      }
    };

    createOrder();
  }, [vehicleId, quantity, userEmail]);

  const handleApprove = (data, actions) => {
    // Redirect to PayPal's approval URL
    if (approvalLink) {
      window.location.href = approvalLink;
    }
  };

  const handleError = (err) => {
    console.error('PayPal error:', err);
  };

  return (
    <div>
      {approvalLink && (
        <div id="paypal-button-container">
          <paypal.Buttons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: quantity * 100, // Set total amount (in cents) based on quantity
                    },
                  },
                ],
              });
            }}
            onApprove={handleApprove}
            onError={handleError}
          />
        </div>
      )}
    </div>
  );
};

export default PayPalPaymentButton;
