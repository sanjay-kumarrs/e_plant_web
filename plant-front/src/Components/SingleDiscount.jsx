import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const SingleDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/discounts/${id}`);
        if (res.data.status === "success" && res.data.discount) {
          setDiscount(res.data.discount);
        } else {
          setError("Discount not found");
        }
      } catch (err) {
        console.error("Error fetching discount:", err);
        setError("Error fetching discount details");
      } finally {
        setLoading(false);
      }
    };
    fetchDiscount();
  }, [id]);

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleBuyNow = () => {
    if (!discount) return;

    // Pass only the necessary fields to the payment page (without seller)
    const paymentData = {
      name: discount.product,
      category: discount.type,
      price: discount.newPrice,
      quantity,
    };

    navigate(`/discountpayment/${discount._id}`, {
      state: paymentData,
    });
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!discount) return null;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="row shadow-lg rounded p-4">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={discount.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt={discount.title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            <h2 className="mb-3">{discount.title}</h2>
            <p><strong>Product:</strong> {discount.product}</p>
            <p><strong>Type:</strong> {discount.type}</p>
            {discount.type === "percentage" && <p><strong>Percentage:</strong> {discount.percentage}%</p>}
            <p><strong>Details:</strong> {discount.details || "No extra details"}</p>
            {discount.newPrice && <h4 className="text-success mb-3">Price: ₹{discount.newPrice}</h4>}

            <div className="d-flex align-items-center gap-2 mt-3">
              <button className="btn btn-secondary btn-sm" onClick={() => changeQuantity(-1)}>–</button>
              <input type="text" value={quantity} readOnly style={{ width: "50px", textAlign: "center" }} />
              <button className="btn btn-secondary btn-sm" onClick={() => changeQuantity(1)}>+</button>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-info" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleDiscount;
