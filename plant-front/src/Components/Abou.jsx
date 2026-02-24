import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCarousel,
  MDBCarouselItem,
  MDBFooter
} from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import nat1 from "../assets/nature1.jpg";
import nat2 from "../assets/nature2.jpg";
import nat3 from "../assets/nature3.jpg"; 
import nat4 from "../assets/nature4.jpg";

const About = () => {
  return (
    <div>
      <Navbar />
      <MDBContainer fluid className="py-5 position-relative">
        <h1 className="position-absolute top-0 start-0 text-uppercase display-1 fw-bold text-light opacity-25">
          About
        </h1>

        {/* About GreenCart */}
        <MDBRow className="align-items-center">
          <MDBCol md="6" className="px-4">
            <h2 className="fw-bold text-success">
              About <span className="text-dark">GreenCart</span>
            </h2>
            <p className="mt-3 text-muted fs-5">
              GreenCart is your one-stop online platform for purchasing plants,
              vegetables, fruits, and gardening essentials. We make it easy to
              nurture your indoor and outdoor spaces with healthy, thriving plants.
            </p>
            <p className="mt-3 text-muted fs-5">
              Each product includes seller details and contact options for guidance
              on planting and care. GreenCart ensures quality, freshness, and expert
              support to help your plants flourish.
            </p>
          </MDBCol>
          <MDBCol md="6" className="d-flex justify-content-center">
            <img
              src={nat3}
              alt="GreenCart Plants"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "80%" }}
            />
          </MDBCol>
        </MDBRow>

        {/* Mission Section */}
        <MDBRow className="mt-5">
          <MDBCol md="12" className="d-flex justify-content-center">
            <MDBCard className="shadow-lg border-0" style={{ maxWidth: "800%", backgroundColor: "#d4edda" }}>
              <MDBCardBody className="p-4 text-center">
                <h2 className="fw-bold text-dark">Our Mission</h2>
                <p className="text-dark fs-5 mt-3">
                  Our mission is to make gardening simple, enjoyable, and accessible
                  for everyone. From indoor plants to outdoor gardens, we provide
                  quality products, seller support, and guidance to help your plants thrive.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

       {/* Features Carousel */}
<MDBRow className="mt-5 text-center">
  <MDBCol md="12">
    <h2 className="fw-bold text-dark">Key Features</h2>
  </MDBCol>
</MDBRow>

<MDBRow className="mt-4">
  <MDBCol md="12">
  <MDBCarousel showControls fade ride="carousel" interval={3000}>
      {/* Feature 1 */}
      <MDBCarouselItem
        itemId={1}
        className="d-flex align-items-center justify-content-center text-center rounded"
        style={{
          width: "100%",
          height: "400px",
          backgroundImage: "url('https://i.pinimg.com/1200x/d8/d1/5e/d8d15e655f81b7f2f5d4a1e6884aa3d5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textShadow: "2px 2px 5px rgba(0,0,0,0.7)"
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.4)", padding: "20px", borderRadius: "10px" }}>
          <h3 className="fw-bold">Wide Plant Range</h3>
          <p>Indoor, Outdoor, Fruit, and Vegetable plants for every garden.</p>
        </div>
      </MDBCarouselItem>

      {/* Feature 2 */}
      <MDBCarouselItem
        itemId={2}
        className="d-flex align-items-center justify-content-center text-center rounded"
        style={{
          width: "100%",
          height: "400px",
          backgroundImage: "url('https://i.pinimg.com/1200x/f6/be/e5/f6bee5f67db03e53d1c9ff12c41ccf42.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textShadow: "2px 2px 5px rgba(0,0,0,0.7)"
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.4)", padding: "20px", borderRadius: "10px" }}>
          <h3 className="fw-bold">Easy Ordering & Cart</h3>
          <p>Add plants to your cart and place orders with just a few clicks.</p>
        </div>
      </MDBCarouselItem>
    </MDBCarousel>
  </MDBCol>
</MDBRow>
{/* Quote Section */}
<MDBRow className="mt-4">
  <MDBCol md="12" className="d-flex justify-content-center">
    <div style={{ maxWidth: "70%", textAlign: "center", color: "#155724", fontStyle: "italic", fontSize: "1.5rem" }}>
      "To plant a garden is to believe in tomorrow."  
      <br />
      <span style={{ fontSize: "1rem", color: "#6c757d" }}>— Audrey Hepburn</span>
    </div>
  </MDBCol>
</MDBRow>


      {/* Footer */}
     {/* Footer */}
<MDBFooter className="text-center text-lg-start" style={{ backgroundColor: '#9ede96ff', color: 'black' }}>
  <MDBContainer className="p-4">
    <div className="row">
      {/* Quick Links */}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/viewplant" className="text-dark">Home</a></li>
          <li><a href="/about" className="text-dark">About Us</a></li>
          <li><a href="/viewplant" className="text-dark">Services</a></li>
          <li><a href="/about" className="text-dark">Contact</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Contact Us</h5>
        <p>Email: eplant@gmail.com</p>
        <p>Phone: +91 6282011259</p>
        <p>Location: Kerala, India</p>
      </div>

      {/* Social Media Icons */}
      <div className="col-lg-4 col-md-12 mb-4 mb-md-0 d-flex align-items-center justify-content-lg-end justify-content-center">
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/leafing_lee_?igsh=MWo0OXR3amY3emZocg==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="me-3 text-dark fs-4"
        >
          <i className="fab fa-instagram"></i>
        </a>

        {/* Gmail */}
        <a href="mailto:eplant@gmail.com" className="me-3 text-dark fs-4">
          <i className="fas fa-envelope"></i>
        </a>

        {/* WhatsApp → home */}
        <a href="/" className="me-3 text-dark fs-4">
          <i className="fab fa-whatsapp"></i>
        </a>

        {/* X → home */}
        <a href="/" className="text-dark fs-4">
          <i className="fab fa-x-twitter"></i>
        </a>
      </div>
    </div>
    <div className="text-center p-3" >
    © {new Date().getFullYear()} Greencart. All rights reserved.
  </div>
  </MDBContainer>

  {/* Bottom Bar */}

 
</MDBFooter>
      </MDBContainer>
    </div>
  );
};

export default About;
