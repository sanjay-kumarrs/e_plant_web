import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ViewPlants = () => {
  const [plants, setPlants] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const [addedToCartIds, setAddedToCartIds] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewplants");
        if (response.data.status === "success") {
          setPlants(response.data.plants);

          // initialize each plant's quantity to 1
          const initialQuantities = {};
          response.data.plants.forEach((plant) => {
            initialQuantities[plant._id] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlants();
  }, []);

  const changeQuantity = (plantId, delta) => {
    setQuantities((prev) => {
      const currentQty = prev[plantId] || 1;
      const newQty = currentQty + delta;
      if (newQty < 1) return prev;
      return { ...prev, [plantId]: newQty };
    });
  };

  const handleAddToCart = async (plant) => {
    try {
      const quantity = quantities[plant._id] || 1;
  
      await axios.post("http://localhost:8080/cart", {
        userId,
        name: plant.name,
        category: plant.category,
        seller: plant.seller, 
        price: plant.price,
        picture: plant.picture,
        quantity, 
      });
  
      setAddedToCartIds((prev) => [...prev, plant._id]);
      setCartMessage(`${plant.name} (Qty: ${quantity}) added to cart successfully!`);
      setTimeout(() => setCartMessage(""), 2000);
    } catch (error) {
      alert("Error adding to cart");
    }
  };
  

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = (plant) => {
    const quantity = quantities[plant._id] || 1;
    navigate("/buypayment", {
      state: {
        name: plant.name,
        category: plant.category,
        price: plant.price,
        seller: plant.seller,
        quantity
      },
    });
  };
  
// Single search across name, category, price, and seller
const filteredPlants = plants.filter((plant) => {
  const search = searchText.trim().toLowerCase();
  if (!search) return true;

  const matchesName = plant.name.toLowerCase().includes(search);
  const matchesCategory = plant.category.toLowerCase().includes(search);
  const matchesSeller = plant.seller?.toLowerCase().includes(search);
  const searchAsNumber = Number(search);
  const matchesPrice =
    !isNaN(searchAsNumber) && plant.price <= searchAsNumber;

  return matchesName || matchesCategory || matchesSeller || matchesPrice;
});


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Our Plant Collection</h2>

        {/* Search Bar */}
        <div className="row mb-4 justify-content-center">
          <div className="col-sm-6 col-md-4">
          <input
  type="text"
  className="form-control"
  placeholder="Search by name, category, seller, or max price"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>

          </div>
        </div>

        {cartMessage && (
          <div className="alert alert-success text-center">{cartMessage}</div>
        )}

        <div className="row g-3 justify-content-center">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={plant._id}>
                <div
                  className="card mx-auto"
                  style={{ maxWidth: "250px", marginBottom: "20px" }}
                >
                <img
                  src={`http://localhost:8080/${plant.picture}`}
                  className="card-img-top"
                  alt={plant.name}
                  style={{ height: "180px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => navigate(`/singleitem/${plant._id}`)}
                />

                  <div className="card-body p-2">
                    <h5 className="card-title" style={{ fontSize: "1rem" }}>
                      {plant.name}
                    </h5>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Category: {plant.category}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Stock: {plant.stock}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Price: ${plant.price}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Seller: {plant.seller}
                    </p>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => changeQuantity(plant._id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantities[plant._id] || 1}
                        readOnly
                        style={{ width: "40px", textAlign: "center" }}
                      />
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => changeQuantity(plant._id, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleBuyNow(plant)}
                      >
                        Buy Now
                      </button>
                      {addedToCartIds.includes(plant._id) ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleGoToCart}
                        >
                          Go to Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAddToCart(plant)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No plants available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPlants;