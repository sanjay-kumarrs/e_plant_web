import React, { useState } from 'react';
import { 
  MDBCarousel, 
  MDBCarouselItem, 
  MDBContainer, 
  MDBModal, 
  MDBModalDialog, 
  MDBModalContent, 
  MDBModalHeader, 
  MDBModalTitle, 
  MDBModalBody, 
  MDBFooter 
} from 'mdb-react-ui-kit';
import test1 from '../assets/testimonials-1.jpg';
import test2 from '../assets/testimonials-2.jpg';
import test3 from '../assets/testimonials-3.jpg';
import test4 from '../assets/testimonials-4.jpg'; 
import test5 from '../assets/testimonials-5.jpg'; 
import test6 from '../assets/testimonials-6.jpg'; 




const Home = () => {
  // State to manage modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      img: "https://www.ginesys.in/sites/default/files/styles/webp/public/articles/Ginesys_Blog_Boosting%20Sales%20e-commerce.png.webp",
      title: "Seamless E-Commerce Experience",
      desc: " Ensuring smooth navigation, secure checkout, multiple payment options, and real-time order tracking for buyers."
    },
    {
      img: "https://www.cropin.com/wp-content/uploads/2025/04/agritech-in-Smarter.jpg",
      title: "Empowered Seller Management ",
      desc: "Providing vendors with robust tools for product listings, inventory control, order handling, and performance analytics."
    },
    {
      img: "https://www.pravaahindia.com/cdn/shop/articles/Sustainable_Community.webp?v=1679739847",
      title: "Community Engagement & Sustainability",
      desc: " Building a forum for plant lovers to share tips, discuss gardening, and promote eco-friendly practices.."
    }
  ];

  // Function to open modal with feature details
  const handleCardClick = (feature) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  return (
    
    
    <div>
      
  {/* Top Strip */}
<div className="top-strip py-2 bg-success text-white">
  <div className="container d-flex justify-content-between align-items-center">
    {/* Left side - Offer Text */}
    <p className="mb-0">
      Get up to 20% off on your first order! Join our community of plant lovers today. 👍
    </p>

    {/* Right side - Action Buttons */}
    <div className="d-flex gap-3">
      <a href="/login" className="btn btn-light btn-sm text-success">
        <i className="fas fa-sign-in-alt me-2"></i> Login
      </a>
      <a href="/signup" className="btn btn-dark btn-sm">
        <i className="fas fa-user-plus me-2"></i> Sign Up
      </a>
    </div>
  </div>
</div>

{/* Image Carousel */}
<MDBCarousel showControls showIndicators fade ride="carousel" interval={3000} className="m-0 p-0">
  <MDBCarouselItem itemId={1}>
    <img
      className="d-block w-100"
      style={{ height: '600px', objectFit: 'cover' }}
      src="https://wallpapers.com/images/hd/white-clover-flower-plant-4k-background-bnst575gd8c5rfmb.jpg"
      alt="First slide"
    />
  </MDBCarouselItem>
  <MDBCarouselItem itemId={2}>
    <img
      className="d-block w-100"
      style={{ height: '600px', objectFit: 'cover' }}
      src="https://e0.pxfuel.com/wallpapers/737/184/desktop-wallpaper-sprout-earth-hq-sprout-2019-seed-germination.jpg"
      alt="Second slide"
    />
  </MDBCarouselItem>
  <MDBCarouselItem itemId={3}>
    <img
      className="d-block w-100"
      style={{ height: '600px', objectFit: 'cover' }}
      src="https://wallpapers.com/images/featured/plants-omkgbojkkw14dmmv.jpg"
      alt="Third slide"
    />
  </MDBCarouselItem>
</MDBCarousel>

 


      {/* Hero Section */}
      <MDBContainer className="text-center mt-5">
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2c3e50" }}>
          🌿 GreenCart
        </h1>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "500", color: "#e67e22", marginTop: "5px" }}>
          Your Plant & Garden Marketplace
        </h3>

        <p>
         GreenCart is a dedicated e-commerce platform for plant lovers, offering plants, gardening tools, eco-friendly décor, and organic products. It provides smooth shopping, secure payments, and a community forum for sharing tips and ideas.
        </p>

       
    <br></br>
        {/* Key Focus Areas */}
        <h3 style={{ backgroundColor: "#90EE90", padding: "10px" }}>
          📋 Our Key Focus Areas
        </h3>
        <p>We deliver a seamless shopping experience, empower sellers with advanced tools, and nurture a vibrant, eco-friendly community for plant lovers..</p>

        {/* Feature Cards */}
        <div className="row mt-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card p-3 shadow" style={{ cursor: "pointer" }} onClick={() => handleCardClick(feature)}>
                <img className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} src={feature.img} alt={feature.title} />
                <h5 className="mt-2">{feature.title}</h5>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Feature Details */}
        <MDBModal open={modalOpen} setOpen={setModalOpen}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>{selectedFeature?.title}</MDBModalTitle>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </MDBModalHeader>
              <MDBModalBody>
                <img className="img-fluid" src={selectedFeature?.img} alt={selectedFeature?.title} style={{ height: '200px', objectFit: 'cover' }} />
                <p className="mt-3">{selectedFeature?.desc}</p>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

{/* Testimonial Section */}
<div
  className="py-5"
  style={{
    backgroundColor: "#2E8B57", // Full-width green background
    color: "#FAFAFA",
    marginRight: '-110px',
    marginLeft: '-110px',
  }}
>
  <div className="container text-center">
    <h2 style={{ color: "#90EE90", marginBottom: "30px" }}>
      🌱 What Our Plant Lovers Say
    </h2>

    {/* Testimonial Carousel */}
    <MDBCarousel showControls showIndicators fade interval={4000}>
      
      {/* Slide 1 - Testimonial 1 & 2 */}
      <MDBCarouselItem itemId={1}>
        <div className="row justify-content-center">
          {/* Testimonial 1 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test1}
                alt="testimonial1"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “Plants give us oxygen for the lungs and for the soul.” – Linda Solegato
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star-half-alt text-warning"></i>
                <p className="mt-2 mb-0">Rated 4.5/5</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test2}
                alt="testimonial2"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “Every flower is a soul blossoming in nature.” – Gérard de Nerval
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <p className="mt-2 mb-0">Rated 5/5</p>
              </div>
            </div>
          </div>
        </div>
      </MDBCarouselItem>

      {/* Slide 2 - Testimonial 3 & 4 */}
      <MDBCarouselItem itemId={2}>
        <div className="row justify-content-center">
          {/* Testimonial 3 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test3}
                alt="testimonial3"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “Life begins the day you start a garden.” – Chinese Proverb
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star-half-alt text-warning"></i>
                <i className="far fa-star text-warning"></i>
                <p className="mt-2 mb-0">Rated 3.5/5</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test4}
                alt="testimonial4"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “Gardening adds years to your life and life to your years.”-Gary Lewis
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="far fa-star text-warning"></i>
                <p className="mt-2 mb-0">Rated 4/5</p>
              </div>
            </div>
          </div>
        </div>
      </MDBCarouselItem>

      {/* Slide 3 - Testimonial 5 & 6 */}
      <MDBCarouselItem itemId={3}>
        <div className="row justify-content-center">
          {/* Testimonial 5 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test5}
                alt="testimonial5"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “To plant a garden is to believe in tomorrow.” – Audrey Hepburn
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star-half-alt text-warning"></i>
                <i className="far fa-star text-warning"></i>
                <p className="mt-2 mb-0">Rated 3.5/5</p>
              </div>
            </div>
          </div>

          {/* Testimonial 6 */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 shadow-lg"
              style={{
                backgroundColor: "#3CB371",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <img
                src={test6}
                alt="testimonial6"
                className="rounded-circle shadow mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>
                “A garden requires patient labor and attention. Plants reward us with beauty.”– Liberty Hyde Bailey
              </p>
              <div>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="far fa-star text-warning"></i>
                <i className="far fa-star text-warning"></i>
                <p className="mt-2 mb-0">Rated 3/5</p>
              </div>
            </div>
          </div>
        </div>
      </MDBCarouselItem>

    </MDBCarousel>
  </div>
</div>

       
        </MDBContainer>


      {/* Footer */}
     {/* Footer */}
<MDBFooter className="text-center text-lg-start" style={{ backgroundColor: '#9ede96ff', color: 'black' }}>
  <MDBContainer className="p-4">
    <div className="row">
      {/* Quick Links */}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/" className="text-dark">Home</a></li>
          <li><a href="/about" className="text-dark">About Us</a></li>
          <li><a href="/services" className="text-dark">Services</a></li>
          <li><a href="/contact" className="text-dark">Contact</a></li>
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


    </div>
  );
};

export default Home;