import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdb-react-ui-kit";
import GreenCart from "../assets/GreenCart.png";

const AdminNavbar = () => {
  const [openNavColor, setOpenNavColor] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Common link style
  const linkStyle = {
    color: "#C1FFC1", // Light green
    transition: "color 0.3s ease"
  };

  // Hover effect function
  const handleMouseEnter = (e) => (e.target.style.color = "#ADFF2F"); // Lime green
  const handleMouseLeave = (e) => (e.target.style.color = "#C1FFC1");

  return (
    <MDBNavbar
      expand="lg"
      style={{
        backgroundColor: "#2E8B57", // Deep green background
      }}
    >
      <MDBContainer fluid>
        {/* Brand */}
        <MDBNavbarBrand
          href="/"
          className="fs-6 fw-bold d-flex align-items-center"
          style={{ color: "#C1FFC1" }}
        >
          <img
            src={GreenCart}
            alt="GreenCart Logo"
            width="50"
            height="50"
            className="me-2 rounded-circle"
            style={{ objectFit: "cover" }}
          />
          <span style={{ fontSize: "1.5rem" }}></span>
        </MDBNavbarBrand>

        {/* Toggler */}
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNavColor(!openNavColor)}
          style={{ color: "#C1FFC1" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        {/* Collapse */}
        <MDBCollapse open={openNavColor} navbar>
          <MDBNavbarNav className="fs-5 fw-bold w-100 d-flex align-items-center">
            {/* Left side links */}
            <div className="d-flex flex-grow-1 align-items-center">
              <MDBNavbarItem>
              <MDBNavbarLink
                href="/plant"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              <MDBIcon fas icon="leaf" className="me-1" /> {/* small leaf icon */}
              Plants
              </MDBNavbarLink>
              </MDBNavbarItem>


            {/*}  <MDBNavbarItem>
                <MDBNavbarLink
                  href="/pregnants"
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Add To Cart
                </MDBNavbarLink>
              </MDBNavbarItem> */}

              <MDBNavbarItem>
              <MDBNavbarLink
              href="/getallorder"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
            <MDBIcon fas icon="shopping-bag" className="me-1" /> {/* order icon */}Orders
            </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
            <MDBNavbarLink
            href="/discount"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
          <MDBIcon fas icon="tags" className="me-1" /> {/* Discount icon */}
          Discounts
          </MDBNavbarLink>
          </MDBNavbarItem>



              <MDBNavbarItem>
  <MDBNavbarLink
    href="/adminfeedback"
    style={linkStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <MDBIcon fas icon="comment-dots" className="me-1" /> {/* Feedback icon */}
    Feedback
  </MDBNavbarLink>
</MDBNavbarItem>


  
            </div>

            {/* Gap before profile icon */}
            <div style={{ marginLeft: "700px" }}></div>

            {/* Right side profile */}
            <div className="ms-auto">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link d-flex align-items-center"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <MDBIcon fas icon="user-circle" size="xl" className="me-2" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem
                      onClick={LogOut}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminNavbar;
