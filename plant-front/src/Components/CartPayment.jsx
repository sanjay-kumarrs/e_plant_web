import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const CartPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalAmount, totalItems } = location.state || {};
  const loggedInUserId = localStorage.getItem("userid");

  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!cartItems || !totalAmount) {
      navigate("/cart");
    }
  }, [cartItems, totalAmount, navigate]);

  const qrDataGPay = `Payment for ${totalItems} items worth ₹${totalAmount.toFixed(
    2
  )} via GPay`;
  const qrDataPhonePe = `Payment for ${totalItems} items worth ₹${totalAmount.toFixed(
    2
  )} via PhonePe`;

  const handlePaymentSelect = (method) => setSelectedPayment(method);

  const handlePaymentSuccess = async () => {
    try {
      // Save each cart item as a separate order
      for (let item of cartItems) {
        await axios.post("http://localhost:8080/order", {
          userId: loggedInUserId,
          name: item.name,
          category: item.category,
          seller: item.seller,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          paymentMethod: selectedPayment
        });
      }

      alert("Payment successful! Orders saved.");
      navigate("/viewplant", { state: { userId: loggedInUserId } });
    } catch (error) {
      console.error(error);
      alert("Error saving order.");
    }
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 10px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    marginTop: "20px",
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 30,
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: 20 }}>Payment Summary</h2>

      <div
        style={{
          textAlign: "left",
          marginBottom: 20,
          color: "#555",
          maxHeight: "200px",
          overflowY: "auto",
          paddingRight: 10,
        }}
      >
        <h4>Items to be Purchased:</h4>
        <ul>
          {cartItems &&
            cartItems.map((item) => (
              <li key={item._id}>
                {item.name} (x{item.quantity}) - ₹
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
        </ul>

        <h4>Total Items: {totalItems}</h4>
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>

      <p style={{ marginBottom: 30, color: "#555" }}>
        Please select a payment method:
      </p>

      <div style={{ marginBottom: 30 }}>
        <button
          style={buttonStyle}
          onClick={() => handlePaymentSelect("GPay")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay with GPay
        </button>
        <button
          style={buttonStyle}
          onClick={() => handlePaymentSelect("PhonePe")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Pay with PhonePe
        </button>
      </div>

      {selectedPayment && (
        <>
          <p style={{ marginBottom: 20, color: "#555" }}>
            Please scan the QR code to complete your payment via{" "}
            {selectedPayment}.
          </p>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 10, color: "#007bff" }}>
              {selectedPayment}
            </h3>
            <QRCodeCanvas
              value={selectedPayment === "GPay" ? qrDataGPay : qrDataPhonePe}
              size={200}
            />
          </div>

          <button
            style={successButtonStyle}
            onClick={handlePaymentSuccess}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Simulate {selectedPayment} Payment Success
          </button>
        </>
      )}

     
    </div>
  );
};

export default CartPayment;