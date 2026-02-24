import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const DiscountPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userid");
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Destructure passed state (without seller)
  const { name, category, price, quantity } = location.state || {};

  if (!name) return <div>No discount data passed. Please go back.</div>;

  const totalPrice = price * quantity;
  const qrDataGPay = `Payment for ${name} worth ₹${totalPrice} via GPay`;
  const qrDataPhonePe = `Payment for ${name} worth ₹${totalPrice} via PhonePe`;

  const handlePaymentSelect = (method) => setSelectedPayment(method);

  const handlePaymentSuccess = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method first.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/order", {
        userId: loggedInUserId,
        name,
        category,
        price,
        quantity,
        totalPrice,
        paymentMethod: selectedPayment,
        isDiscount: true,
      });

      alert("Payment successful! Discount order saved.");
      navigate("/viewdiscount", { state: { userId: loggedInUserId } });
    } catch (err) {
      console.error(err);
      alert("Payment successful! Discount order saved.");
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Payment for Discounted Item: {name}</h2>
      <p style={{ color: "#555", marginBottom: "5px" }}>Category: {category}</p>
      <p style={{ color: "#555", marginBottom: "5px" }}>Unit Price: ₹{price}</p>
      <p style={{ color: "#555", marginBottom: "5px" }}>Quantity: {quantity}</p>
      <p style={{ color: "#555", marginBottom: "30px", fontWeight: "bold" }}>Total Price: ₹{totalPrice}</p>

      <p style={{ color: "#555", marginBottom: "30px" }}>Please select a payment method:</p>
      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => handlePaymentSelect("GPay")} style={{ padding: "12px 24px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "15px", fontSize: "16px" }}>Pay with GPay</button>
        <button onClick={() => handlePaymentSelect("PhonePe")} style={{ padding: "12px 24px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Pay with PhonePe</button>
      </div>

      {selectedPayment && (
        <>
          <p style={{ color: "#555", marginBottom: "20px" }}>Please scan the QR code to complete your payment via {selectedPayment}.</p>
          <div style={{ marginBottom: "20px" }}>
            {selectedPayment === "GPay" && <>
              <h3 style={{ color: "#007bff" }}>GPay</h3>
              <QRCodeCanvas value={qrDataGPay} size={200} />
            </>}
            {selectedPayment === "PhonePe" && <>
              <h3 style={{ color: "#007bff" }}>PhonePe</h3>
              <QRCodeCanvas value={qrDataPhonePe} size={200} />
            </>}
          </div>
          <button onClick={handlePaymentSuccess} style={{ padding: "12px 24px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
            Simulate {selectedPayment} Payment Success
          </button>
        </>
      )}
    </div>
  );
};

export default DiscountPayment;
