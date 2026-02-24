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
  MDBIcon,
} from "mdb-react-ui-kit";
import { IoCartOutline } from 'react-icons/io5'
import GreenCart from "../assets/GreenCart.png";

const Navbar = () => {
  const [openNavColor, setOpenNavColor] = useState(false);
  const navigate = useNavigate();
  

  const LogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Common link style
  const linkStyle = {
    color: "#C1FFC2", // Light green
    transition: "color 0.3s ease",
  };

  // Hover effect
  const handleMouseEnter = (e) => (e.target.style.color = "#ADFF2F"); // Lime green
  const handleMouseLeave = (e) => (e.target.style.color = "#C1FFC1");

  return (
    <MDBNavbar expand="lg" style={{ backgroundColor: "#2E8B57" }}> {/* Navbar color Green */}
      <MDBContainer fluid>
        <MDBNavbarBrand
          href="/"
          className="fs-4 fw-bold d-flex align-items-center"
          style={{ color: "#C1FFC1" }}
        >
          <img
            src={GreenCart}
            alt="GreenCart Logo"
            width="50"
            height="50"
            className="me-2 rounded-circle"
          />
         
        </MDBNavbarBrand>

        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNavColor(!openNavColor)}
          style={{ color: "#C1FFC1" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse open={openNavColor} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0 fs-5 fw-bold">
            <MDBNavbarItem>
              <MDBNavbarLink
                href="/viewplant"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            


            <MDBNavbarItem>
              <MDBNavbarLink
                href="/cart"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} 

              >
                <IoCartOutline className='h-10 w-10' />
                <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>cart</span>
                
              </MDBNavbarLink>
            </MDBNavbarItem>

             {/*} <MDBNavbarItem>
              <MDBNavbarLink
                href="/"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                
              </MDBNavbarLink>
            </MDBNavbarItem> 

            <MDBNavbarItem>
              <MDBNavbarLink
                href="/order"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                order
              </MDBNavbarLink>
            </MDBNavbarItem> */}

            <MDBNavbarItem>
  <MDBNavbarLink
    href="/viewdiscount"
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
    href="/feedback"
    style={linkStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <MDBIcon fas icon="comment-dots" className="me-1" /> {/* Feedback icon */}
    Feedback
  </MDBNavbarLink>
</MDBNavbarItem>


            <MDBNavbarItem>
              <MDBNavbarLink
                href="/about"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                About
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Gap before profile icon */}
            <div style={{ marginLeft: "700px" }}></div>

            {/* Profile Dropdown at Extreme Right */}
            <MDBNavbarItem className="ms-auto">
  <MDBDropdown>
    <MDBDropdownToggle
      tag="a"
      className="nav-link d-flex align-items-center p-0"
      style={{ cursor: "pointer" }}
    >
      <MDBIcon fas icon="user-circle" size="2x" className="me-2 text-primary" />
    </MDBDropdownToggle>

    <MDBDropdownMenu className="dropdown-menu-end shadow rounded-3">
      <MDBDropdownItem link href="/profile">
        <MDBIcon fas icon="user" className="me-2 text-secondary" />
        View Profile
      </MDBDropdownItem>

      <MDBDropdownItem link href="/order">
        <MDBIcon fas icon="shopping-bag" className="me-2 text-success" />
        My Orders
      </MDBDropdownItem>

      <MDBDropdownItem divider />

      <MDBDropdownItem
        onClick={LogOut}
        style={{ cursor: "pointer" }}
        className="text-danger fw-bold"
      >
        <MDBIcon fas icon="sign-out-alt" className="me-2" />
        Logout
      </MDBDropdownItem>
    </MDBDropdownMenu>
  </MDBDropdown>
</MDBNavbarItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
