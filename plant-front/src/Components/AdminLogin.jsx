import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/AdminLogin', formData);
      const { status, token, message } = res.data;

      if (status === 'success') {
        localStorage.setItem('adminToken', token);
        alert(message || 'Admin logged in successfully');
        navigate('/adminhome'); // redirect after successful login
      } else {
        setError(status);
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <MDBContainer className="my-5 d-flex justify-content-center">
      <MDBCard style={{ maxWidth: '500px', width: '100%' }}>
        <MDBCardBody>
          <MDBTypography tag="h4" className="mb-4 text-center">
            <MDBIcon fas icon="user-shield" className="me-2" />
            Admin Login
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
            />
            <MDBInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <MDBBtn className="w-100" color="primary" type="submit">
              Login
            </MDBBtn>
          </form>

          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdminLogin;