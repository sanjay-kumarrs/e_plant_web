import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart?userId=${userId}`);
      if (response.data.status === "success") {
        setCartItems(response.data.cart);
        calculateTotal(response.data.cart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
    setTotalAmount(total);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${id}`, {
        data: { userId }
      });
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Save order details before clearing cart
      const orderDetails = {
        cartItems: cartItems.map((item) => ({
          name: item.name,
          category: item.category,
          seller: item.seller,
          price: item.price,
          quantity: item.quantity || 1
        })),
        totalAmount,
        totalItems: cartItems.length
      };

      // ✅ Clear cart in backend
      await axios.delete(`http://localhost:8080/cart/clear`, {
        data: { userId }
      });

      // ✅ Clear frontend state
      setCartItems([]);
      setTotalAmount(0);

      // ✅ Navigate to payment page
      navigate("/cartpayment", { state: orderDetails });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">Your Cart</h2>
        <div className="row g-3 justify-content-center">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={item._id}>
                <div
                  className="card mx-auto"
                  style={{ maxWidth: "250px", marginBottom: "20px" }}
                >
                  <img
                    src={`http://localhost:8080/${item.picture}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h5 style={{ fontSize: "1rem", marginBottom: "5px" }}>
                      {item.name}
                    </h5>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Category: {item.category}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Seller: {item.seller}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Price: ₹{item.price}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "0.85rem",
                        marginBottom: "8px"
                      }}
                    >
                      Quantity: {item.quantity || 1}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="text-center mt-4">
            <h5>Total Items: {cartItems.length}</h5>
            <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
            <button
              className="btn btn-primary btn-lg mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
