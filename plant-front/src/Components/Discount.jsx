import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDiscount, setNewDiscount] = useState({
    title: "",
    type: "bogo",
    product: "",
    details: "",
    percentage: "",
    image: "",
    newPrice: "", // <-- use camelCase consistently
  });

  // Fetch all discounts
  const fetchDiscounts = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/discounts")
      .then((res) => {
        setDiscounts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching discounts:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewDiscount({ ...newDiscount, [e.target.name]: e.target.value });
  };

  // Add new discount
  const handleAdd = () => {
    if (!newDiscount.title || !newDiscount.product) {
      alert("Title and product are required");
      return;
    }

    axios
      .post("http://localhost:8080/discounts", newDiscount)
      .then((res) => {
        if (res.data.status === "success") {
          fetchDiscounts();
          setNewDiscount({
            title: "",
            type: "bogo",
            product: "",
            details: "",
            percentage: "",
            image: "",
            newPrice: "",
          });
        } else {
          alert(res.data.message || "Failed to add discount");
        }
      })
      .catch((err) => console.error("Error adding discount:", err));
  };

  // Delete discount
  const handleDelete = (id) => {
    if (!id) return;
    if (window.confirm("Delete this discount?")) {
      axios
        .delete(`http://localhost:8080/discounts/${id}`)
        .then((res) => {
          if (res.data.status === "success") fetchDiscounts();
        })
        .catch((err) => console.error("Error deleting discount:", err));
    }
  };

  if (loading)
    return (
      <MDBSpinner
        color="primary"
        className="d-flex justify-content-center mt-5"
      />
    );

  return (
    <div>
      <AdminNavbar />
      <MDBContainer className="py-5">
        <h2 className="text-center mb-4 text-primary">
          Manage Discounts & Offers
        </h2>

        {/* Add Discount Form */}
        <MDBCard className="mb-4 shadow-lg rounded-4 p-3">
          <MDBCardBody>
            <MDBRow className="g-3 align-items-end">
              <MDBCol md="3">
                <MDBInput
                  label="Title"
                  name="title"
                  value={newDiscount.title}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  label="Product"
                  name="product"
                  value={newDiscount.product}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol md="3">
                <select
                  className="form-select"
                  name="type"
                  value={newDiscount.type}
                  onChange={handleChange}
                >
                  <option value="bogo">Buy 1 Get 1</option>
                  <option value="percentage">Percentage</option>
                </select>
              </MDBCol>
              {newDiscount.type === "percentage" && (
                <MDBCol md="2">
                  <MDBInput
                    label="Percentage"
                    name="percentage"
                    type="number"
                    value={newDiscount.percentage}
                    onChange={handleChange}
                  />
                </MDBCol>
              )}
              <MDBCol md="2">
                <MDBInput
                  label="New Price"
                  name="newPrice"
                  type="number"
                  value={newDiscount.newPrice}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  label="Image URL"
                  name="image"
                  value={newDiscount.image}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol md="12">
                <MDBInput
                  label="Details"
                  name="details"
                  value={newDiscount.details}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol md="2">
                <MDBBtn color="success" onClick={handleAdd}>
                  Add
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

        {/* Discount List */}
        {discounts.length === 0 ? (
          <p className="text-center text-danger">No discounts found</p>
        ) : (
          <MDBRow className="g-4">
            {discounts.map((discount) => (
              <MDBCol md="4" sm="6" xs="12" key={discount?._id}>
                <MDBCard className="shadow-lg rounded-4 p-3">
                  {discount?.image && (
                    <img
                      src={discount.image}
                      alt={discount.title}
                      className="rounded-3 mb-3"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <MDBCardBody>
                    <MDBCardTitle>{discount?.title || "No Title"}</MDBCardTitle>
                    <MDBCardText>
                      <strong>Product:</strong> {discount?.product || "N/A"}{" "}
                      <br />
                      <strong>Type:</strong> {discount?.type?.toUpperCase() || "N/A"}{" "}
                      <br />
                      {discount?.type === "percentage" && (
                        <>
                          <strong>Percentage:</strong> {discount?.percentage || 0}%
                          <br />
                        </>
                      )}
                      <strong>New Price:</strong> ₹{discount?.newPrice || 0} <br />
                      <strong>Details:</strong> {discount?.details || "No details"}
                    </MDBCardText>
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(discount?._id)}
                    >
                      Delete
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </MDBContainer>
    </div>
  );
};

export default Discount;
