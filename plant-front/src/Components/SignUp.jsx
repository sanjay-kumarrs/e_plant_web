import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/tests-2.jpg"; // background image

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Live password match check
      if (updated.confirmPassword && updated.password !== updated.confirmPassword) {
        setPasswordMatchError("Passwords do not match.");
      } else {
        setPasswordMatchError("");
      }

      return updated;
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, username, email, password, confirmPassword } = formData;

    // Validation
    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/userSignUp", formData);
      if (res.data.status === "success") {
        setSuccess("Registration successful!");
        setTimeout(() => navigate("/login"), 1500); // Redirect after 1.5s
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error or user already exists.");
    }
  };

  // Disable button if fields are empty or passwords don't match
  const isFormInvalid =
    !formData.name ||
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    passwordMatchError;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <MDBContainer className="d-flex justify-content-center" style={{ zIndex: 1 }}>
        <MDBCard
          style={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.15)", // translucent
            backdropFilter: "blur(12px)", // frosted glass effect
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            color: "white",
          }}
        >
          <MDBCardBody>
            <MDBTypography tag="h4" className="mb-4 text-center" style={{ color: "#fff" }}>
              <MDBIcon fas icon="user-plus" className="me-2" />
              Sign Up
            </MDBTypography>

            <form onSubmit={handleSubmit}>
              <MDBInput
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mb-3"
                required
                contrast
              />
              <MDBInput
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="mb-3"
                required
                contrast
              />
              <MDBInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-3"
                required
                contrast
              />
              <MDBInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mb-3"
                required
                contrast
              />
              <MDBInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mb-1"
                required
                contrast
              />
              {passwordMatchError && (
                <p className="text-danger mb-3">{passwordMatchError}</p>
              )}

              <MDBBtn
                className="w-100"
                type="submit"
                style={{
                  backgroundColor: "rgba(46, 139, 87, 0.85)", // semi-transparent green
                  border: "none",
                }}
                disabled={isFormInvalid}
              >
                Register
              </MDBBtn>
            </form>

            {error && <p className="text-danger text-center mt-3">{error}</p>}
            {success && <p className="text-success text-center mt-3">{success}</p>}

            <p className="text-center mt-3" style={{ color: "#f1f1f1" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#90EE90" }}>
                Login
              </Link>
            </p>

            <p className="text-center mt-2">
              <Link to="/adminlogin">
                <MDBBtn color="danger" size="sm">
                  Admin Login
                </MDBBtn>
              </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default SignUp;
