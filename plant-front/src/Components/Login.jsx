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
import bgImage from "../assets/tests-1jpg.jpg"; // background image

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/userSignIn", formData);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.userid);
        sessionStorage.setItem("email", formData.email);

        navigate("/viewplant");
      } else {
        setError(res.data.status);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

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
            maxWidth: "450px",
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
              <MDBIcon fas icon="sign-in-alt" className="me-2" />
              Login
            </MDBTypography>

            <form onSubmit={handleSubmit}>
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
              <MDBBtn
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: "rgba(46, 139, 87, 0.85)", // semi-transparent green
                  border: "none",
                }}
              >
                Login
              </MDBBtn>
            </form>

            {error && <p className="text-danger text-center mt-3">{error}</p>}

            <p className="text-center mt-3" style={{ color: "#f1f1f1" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#90EE90" }}>
                Register
              </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Login;
