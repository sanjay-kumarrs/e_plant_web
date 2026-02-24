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
  MDBBtn,
} from "mdb-react-ui-kit";

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getallorders");
        console.log("API Response:", res.data);
        if (res.data.status === "success") {
          setOrders(res.data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleProceed = async (orderId) => {
    try {
      const res = await axios.put(`http://localhost:8080/orders/${orderId}/proceed`);
      if (res.data.status === "success") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Shipped" } : order
          )
        );
        alert("Order marked as Shipped!");
      }
    } catch (error) {
      console.error("Error proceeding order:", error);
      alert("Failed to proceed order.");
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
            📋 All Orders (Admin)
          </MDBCardTitle>

          {orders.length === 0 ? (
            <MDBCardText className="text-center text-muted">
              No orders found.
            </MDBCardText>
          ) : (
            <MDBTable align="middle" bordered hover responsive>
              <MDBTableHead light>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="fw-bold">{order.userName || "Unknown"}</td>
                    <td>{order.userEmail || "N/A"}</td>
                    <td>{order.name}</td>
                    <td className="text-success">₹{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <MDBBadge color="primary" pill>
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
                      {order.status === "Cancelled" ? (
                        <MDBBadge color="danger" pill>
                          Cancelled
                        </MDBBadge>
                      ) : order.status === "Shipped" ? (
                        <MDBBadge color="success" pill>
                          Shipped
                        </MDBBadge>
                      ) : (
                        <MDBBtn
                          size="sm"
                          color="success"
                          onClick={() => handleProceed(order._id)}
                        >
                          Proceed
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

export default GetAllOrders;