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
import AdminNavbar from './AdminNavbar';

const AdminHome = () => {
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
      <AdminNavbar/>

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

        {/* Image Carousel */}
        <MDBCarousel showControls showIndicators fade ride="carousel" interval={3000} className="mt-4">
          <MDBCarouselItem itemId={1}>
            <img className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }}
              src="https://wallpapers.com/images/hd/white-clover-flower-plant-4k-background-bnst575gd8c5rfmb.jpg"
              alt="First slide"
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }}
              src="https://static.vecteezy.com/system/resources/thumbnails/047/385/522/small/young-green-plants-sprouting-from-the-soil-with-the-sun-s-rays-c-free-photo.jpg"
              alt="Second slide"
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }}
              src="https://wallpapers.com/images/featured/plants-omkgbojkkw14dmmv.jpg"
              alt="Third slide"
            />
          </MDBCarouselItem>
        </MDBCarousel>
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

<div className="mt-5 d-flex justify-content-center">
  {/* Text Box */}
  <div
    className="p-4 shadow-lg"
    style={{
      width: "80%", // Increased width
      backgroundColor: "#2E8B57", // Deep green
      color: "#FAFAFA", // Soft white text
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      textAlign: "center" // Centers text content
    }}
  >
    <h2 style={{ color: "#90EE90" }}>
      Rooted in Inspiration 🌱
    </h2>
    <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
      “Plants give us oxygen for the lungs and for the soul.” – Linda Solegato
      <br />
      “Every flower is a soul blossoming in nature.” – Gérard de Nerval
      <br />
      “Life begins the day you start a garden.” – Chinese Proverb
    </p>
  </div>
</div>

       
        </MDBContainer>


      {/* Footer */}
     {/* Footer */}
<MDBFooter className="text-center text-lg-start" style={{ backgroundColor: '#9ede96ff', color: 'black', marginTop: '5rem' }}>
  <MDBContainer className="p-4">
    <div className="row">
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">🌿 GreenCart</h5>
        <p>
         "Empowering plant lovers through seamless shopping, seller growth, and a thriving eco-friendly community."
        </p>
      </div>

      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/home" className="text-dark">Home</a></li>
          <li><a href="/about" className="text-dark">About Us</a></li>
          <li><a href="#!" className="text-dark">Services</a></li>
          <li><a href="#!" className="text-dark">Contact</a></li>
        </ul>
      </div>

      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Contact Us</h5>
        <p>Email: eplant@gmail.com</p>
        <p>Phone: +91 6282011259</p>
        <p>Location: Kerala, India</p>
      </div>
    </div>
  </MDBContainer>

  <div className="text-center p-3" style={{ backgroundColor: '#E4E7F4', color: 'black' }}>
    © {new Date().getFullYear()} Greencart. All rights reserved.
  </div>
</MDBFooter>

    </div>
  );
};

export default AdminHome;