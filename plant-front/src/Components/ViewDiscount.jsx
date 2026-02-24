import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBadge,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";   // ✅ Import useNavigate

const ViewDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();                 // ✅ Hook for navigation

  useEffect(() => {
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
  }, []);

  if (loading)
    return (
      <MDBSpinner color="primary" className="d-flex justify-content-center mt-5" />
    );

  if (discounts.length === 0)
    return (
      <MDBContainer className="py-5">
        <h3 className="text-center text-danger">No Discounts Available</h3>
      </MDBContainer>
    );

  return (
    <div>
      <Navbar />
      <MDBContainer className="py-5">
        <h2 className="text-center mb-5 text-primary">Exclusive Discounts & Offers</h2>
        <MDBRow className="g-4">
          {discounts.map((discount) => (
            <MDBCol md="4" sm="6" xs="12" key={discount._id}>
              <MDBCard className="h-100 shadow-sm rounded-4 hover-shadow p-3">
                {/* Image */}
                <div className="text-center mb-3">
                  <img
                    src={
                      discount?.image ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={discount.product}
                    className="img-fluid rounded"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                </div>

                {/* Ribbon Badge */}
                <div className="position-absolute top-0 start-0 m-3">
                  <MDBBadge
                    color={discount.type === "bogo" ? "success" : "warning"}
                    pill
                  >
                    {discount.type === "bogo"
                      ? "Buy 1 Get 1"
                      : `${discount.percentage}% Off`}
                  </MDBBadge>
                </div>

                <MDBCardBody className="text-center mt-3">
                  <MDBCardTitle>{discount.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Product:</strong> {discount.product} <br />
                    <strong>Details:</strong> {discount.details} <br />
                    {discount.type === "percentage" && (
                      <> ({discount.percentage}%)</>
                    )}
                  </MDBCardText>

                  {/* ✅ Navigate to /singleitem/:id when clicked */}
                 <MDBBtn
  color="primary"
  className="mt-2"
  onClick={() => navigate(`/discount/${discount._id}`)}
>
  Shop Now
</MDBBtn>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ViewDiscount;
