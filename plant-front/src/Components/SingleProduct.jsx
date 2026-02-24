import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/plant/${id}`);
        if (res.data.status === "success") {
          setPlant(res.data.plant);
        } else {
          setError("Plant not found");
        }
      } catch (err) {
        setError("Error fetching plant details");
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  const changeQuantity = (delta) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const handleAddToCart = async () => {
    if (!plant) return;
    try {
      await axios.post("http://localhost:8080/cart", {
        userId,
        name: plant.name,
        category: plant.category,
        seller: plant.seller,
        price: plant.price,
        picture: plant.picture,
        quantity,
      });
      setCartMessage(`${plant.name} (Qty: ${quantity}) added to cart successfully!`);
      setTimeout(() => setCartMessage(""), 2000);
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  const handleBuyNow = () => {
    if (!plant) return;
    navigate("/buypayment", {
      state: {
        name: plant.name,
        category: plant.category,
        price: plant.price,
        seller: plant.seller,
        quantity,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!plant) return null;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {cartMessage && (
          <div className="alert alert-success text-center">{cartMessage}</div>
        )}

        <div className="row shadow-lg rounded p-4">
          {/* Left: Product Image */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={`http://localhost:8080/${plant.picture}`}
              alt={plant.name}
              className="img-fluid rounded"
              style={{ maxHeight: "4000px", objectFit: "cover" }}
            />
          </div>

          {/* Right: Product Details */}
          <div className="col-md-6">
            <h2 className="mb-3">{plant.name}</h2>
            <p><strong>Category:</strong> {plant.category}</p>
            <p><strong>Seller:</strong> {plant.seller}</p>
            <h4 className="text-success mb-3">Price: ${plant.price}</h4>
            <p><strong>Stock:</strong> {plant.stock}</p>
            <p><strong>Description:</strong> {plant.description}</p>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center gap-2 mt-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => changeQuantity(-1)}
              >
                –
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                style={{ width: "50px", textAlign: "center" }}
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => changeQuantity(1)}
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-info" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
