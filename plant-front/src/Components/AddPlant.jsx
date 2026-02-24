import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AddPlant = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    plantId: "",
    category: "",
    picture: null,
    stock: "",
    price: "",
    seller: "",
    newprice: ""
  });

  const [plants, setPlants] = useState([]);
  const [message, setMessage] = useState("");
  const [editingPlantId, setEditingPlantId] = useState(null); // Track if editing

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/viewplants");
      if (response.data.status === "success") {
        setPlants(response.data.plants);
      } else {
        setMessage("Error fetching plants. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching plants");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setFormData({ ...formData, picture: file });
      } else {
        setMessage("Please upload an image in JPG or PNG format.");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingPlantId) {
        // ✅ UPDATE logic
        let response;

        if (formData.picture) {
          // Case 1: Update WITH picture
          const formDataToSend = new FormData();
          for (let key in formData) {
            if (formData[key] !== null && formData[key] !== "") {
              formDataToSend.append(key, formData[key]);
            }
          }

          response = await axios.put(
            `http://localhost:8080/plant/${editingPlantId}`,
            formDataToSend,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          // Case 2: Update WITHOUT picture (send JSON)
          const { picture, ...jsonData } = formData;
          response = await axios.put(
            `http://localhost:8080/plant/${editingPlantId}`,
            jsonData
          );
        }

        if (response.data.status === "success") {
          alert("Plant updated successfully!");
          fetchPlants();
          resetForm();
        } else {
          setMessage("Error updating plant.");
        }
      } else {
        // ✅ CREATE logic (always with picture)
        const formDataToSend = new FormData();
        for (let key in formData) {
          if (formData[key] !== null && formData[key] !== "") {
            formDataToSend.append(key, formData[key]);
          }
        }

        const response = await axios.post(
          "http://localhost:8080/plant",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.status === "success") {
          alert("Plant uploaded successfully!");
          fetchPlants();
          resetForm();
        } else {
          setMessage("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Error saving plant");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/plant/${id}`);
      if (response.data.status === "success") {
        setPlants(plants.filter((plant) => plant._id !== id));
        alert("Plant deleted successfully");
      } else {
        setMessage("Error deleting plant. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error deleting plant");
    }
  };

  const handleEdit = (plant) => {
    setFormData({
      name: plant.name,
      description: plant.description,
      plantId: plant.plantId,
      category: plant.category,
      picture: null, // keep null so user can upload new if needed
      stock: plant.stock,
      price: plant.price,
      seller: plant.seller,
      newprice: plant.newprice
    });
    setEditingPlantId(plant._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      plantId: "",
      category: "",
      picture: null,
      stock: "",
      price: "",
      seller: "",
      newprice: ""
    });
    setEditingPlantId(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="text-center">Plant Management</h2>
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name input */}
            <div className="col-md-6">
              <label className="form-label">NAME</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Plant ID */}
            <div className="col-md-6">
              <label className="form-label">PLANT ID</label>
              <input
                type="text"
                className="form-control"
                name="plantId"
                value={formData.plantId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="col-md-12">
              <label className="form-label">DESCRIPTION</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-6">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Flowering">Flowering</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
              </select>
            </div>

            {/* Stock */}
            <div className="col-md-6">
              <label className="form-label">STOCK</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label">PRICE</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* New Price */}
            <div className="col-md-6">
              <label className="form-label">NEW PRICE</label>
              <input
                type="number"
                className="form-control"
                name="newprice"
                value={formData.newprice}
                onChange={handleChange}
              />
            </div>

            {/* Seller */}
            <div className="col-md-6">
              <label className="form-label">SELLER</label>
              <select
                name="seller"
                className="form-control"
                value={formData.seller}
                onChange={handleChange}
                required
              >
                <option value="">Select Seller</option>
                <option value="Greencart">Greencart</option>
                <option value="Suresh">Suresh</option>
                <option value="Manu">Manu</option>
                <option value="Dinesh">Dinesh</option>
                <option value="Ramesh">Ramesh</option>
                <option value="Remya">Remya</option>
                <option value="Kavya">Kavya</option>
              </select>
            </div>

            {/* Picture */}
            <div className="col-md-6">
              <label className="form-label">Upload Picture (JPG or PNG)</label>
              <input
                type="file"
                className="form-control"
                name="picture"
                onChange={handleChange}
              />
              {/* Show current picture in edit mode */}
              {editingPlantId &&
                plants.find((p) => p._id === editingPlantId)?.picture && (
                  <img
                    src={`http://localhost:8080/${plants.find((p) => p._id === editingPlantId)?.picture}`}
                    alt="Current Plant"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
              )}
            </div>

            <center>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  {editingPlantId ? "Update Plant" : "Upload Plant"}
                </button>
                {editingPlantId && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </center>
          </div>
        </form>

        {/* Display Plants */}
        <div className="col-12 mt-4">
          <h3 className="text-center">Uploaded Plants</h3>
        </div>
        <div className="row g-3">
          {plants.length > 0 ? (
            plants.map((plant) => (
              <div className="col-md-3 col-sm-6" key={plant._id}>
                <div className="card" style={{ maxWidth: "220px", margin: "auto" }}>
                  <img
                    src={`http://localhost:8080/${plant.picture}`}
                    className="card-img-top"
                    alt={plant.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title" style={{ fontSize: "1rem" }}>
                      {plant.name} ({plant.plantId})
                    </h6>
                    <p className="card-text mb-1" style={{ fontSize: "0.85rem" }}>
                      {plant.description}
                    </p>
                    <p className="card-text mb-1" style={{ fontSize: "0.85rem" }}>
                      Category: {plant.category}
                    </p>
                    <p className="card-text mb-1" style={{ fontSize: "0.85rem" }}>
                      Stock: {plant.stock}
                    </p>
                    <p className="card-text mb-1" style={{ fontSize: "0.85rem" }}>
                      Price: ${plant.price}
                    </p>
                    <p className="card-text mb-1" style={{ fontSize: "0.85rem" }}>
                      New Price: ${plant.newprice}
                    </p>
                    <p className="card-text mb-2" style={{ fontSize: "0.85rem" }}>
                      Seller: {plant.seller}
                    </p>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(plant)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(plant._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No plants uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
