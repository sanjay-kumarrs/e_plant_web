import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBadge,
  MDBCardText,
  MDBSpinner,
  MDBBtn
} from "mdb-react-ui-kit";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/orders/${userId}`);
        if (res.data.status === "success") {
          setOrders(res.data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchOrders();
    else setLoading(false);
  }, [userId]);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.put(`http://localhost:8080/orders/${orderId}/cancel`);
      if (res.data.status === "success") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
        alert("Order cancelled successfully!");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order.");
    }
  };

  if (loading) {
    return (
      <MDBContainer
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="py-5">
      <MDBCard className="shadow-3">
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4">
            🛒 Your Orders
          </MDBCardTitle>

          {orders.length === 0 ? (
            <MDBCardText className="text-center text-muted">
              You have no orders yet.
            </MDBCardText>
          ) : (
            <MDBTable align="middle" bordered hover responsive>
              <MDBTableHead light>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th> {/* ✅ New column for Cancel */}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="fw-bold">{order.name}</td>
                    <td>{order.category}</td>
                    <td>{order.seller}</td>
                    <td className="text-success">₹{order.price}</td>
                    <td>{order.quantity}</td>
                    <td className="text-primary fw-bold">
                      ₹{order.totalPrice ?? order.price * order.quantity}
                    </td>
                    <td>
                      <MDBBadge color="info" pill>
                        {order.paymentMethod}
                      </MDBBadge>
                    </td>
                    <td>
                      <MDBBadge
                        color={
                          order.status === "Shipped"
                            ? "success"
                            : order.status === "Cancelled"
                            ? "danger"
                            : "warning"
                        }
                        pill
                      >
                        {order.status || "Pending"}
                      </MDBBadge>
                    </td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td>
                      {order.status !== "Shipped" && order.status !== "Cancelled" && (
                        <MDBBtn
                          size="sm"
                          color="danger"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </MDBBtn>
                      )}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Order;