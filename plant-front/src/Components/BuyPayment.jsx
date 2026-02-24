import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const BuyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userid");

  // Extract full plant details from navigation state
  const {
    name,
    category,
    price,
    seller,
    quantity = 1
  } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!name || !price) {
      navigate("/");
    }
  }, [name, price, navigate]);

  const totalPrice = price * quantity;
  const qrDataGPay = `Payment for ${name} worth ₹${totalPrice} via GPay`;
  const qrDataPhonePe = `Payment for ${name} worth ₹${totalPrice} via PhonePe`;

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.post("http://localhost:8080/order", {
        userId: loggedInUserId,
        name,
        category,
        seller,
        price,
        quantity,
        totalPrice, // ✅ Added total price to the order
        paymentMethod: selectedPayment
      });
  
      alert("Payment successful! Order saved.");
      navigate("/viewplant", { state: { userId: loggedInUserId } });
    } catch (error) {
      console.error(error);
      alert("Error saving order.");
    }
  };
  

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Payment for {name}</h2>
      <p style={{ marginBottom: "5px", color: "#555" }}>Category: {category}</p>
      <p style={{ marginBottom: "5px", color: "#555" }}>Seller: {seller}</p>
      <p style={{ marginBottom: "5px", color: "#555" }}>Unit Price: ₹{price}</p>
      <p style={{ marginBottom: "5px", color: "#555" }}>Quantity: {quantity}</p>
      <p style={{ marginBottom: "30px", color: "#555", fontWeight: "bold" }}>
        Total Price: ₹{totalPrice}
      </p>
      <p style={{ marginBottom: "30px", color: "#555" }}>Please select a payment method:</p>

      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => handlePaymentSelect("GPay")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "15px",
            transition: "background-color 0.3s ease",
            fontSize: "16px"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay with GPay
        </button>
        <button
          onClick={() => handlePaymentSelect("PhonePe")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontSize: "16px"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay with PhonePe
        </button>
      </div>

      {selectedPayment && (
        <>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Please scan the QR code to complete your payment via {selectedPayment}.
          </p>
          <div style={{ marginBottom: "20px" }}>
            {selectedPayment === "GPay" && (
              <>
                <h3 style={{ marginBottom: "10px", color: "#007bff" }}>GPay</h3>
                <QRCodeCanvas value={qrDataGPay} size={200} />
              </>
            )}
            {selectedPayment === "PhonePe" && (
              <>
                <h3 style={{ marginBottom: "10px", color: "#007bff" }}>PhonePe</h3>
                <QRCodeCanvas value={qrDataPhonePe} size={200} />
              </>
            )}
          </div>

          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <button
              onClick={handlePaymentSuccess}
              style={{
                padding: "12px 24px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "0 10px",
                transition: "background-color 0.3s ease",
                fontSize: "16px"
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Simulate {selectedPayment} Payment Success
            </button>
          </div>
        </>
      )}

      
    </div>
  );
};

export default BuyPayment;