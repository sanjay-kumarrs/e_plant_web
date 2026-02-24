import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBBtn,
    MDBCardImage,
    MDBIcon
} from 'mdb-react-ui-kit';

const Feedback = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
        rating: 0
    });

    useEffect(() => {
        const userEmail = sessionStorage.getItem('email');
        if (userEmail) {
            setFormData((prevData) => ({ ...prevData, email: userEmail }));
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (newRating) => {
        setFormData((prevData) => ({ ...prevData, rating: newRating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.rating === 0) {
            alert("Please provide a rating before submitting.");
            return;
        }

        axios.post('http://localhost:8080/submitFeedback', formData)
            .then(response => {
                alert('✅ Feedback submitted successfully!');
                setFormData({ email: '', message: '', rating: 0 });
            })
            .catch(error => {
                console.error('❌ Error submitting feedback:', error);
            });
    };

    return (
        <div>
            <Navbar />
            <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
                <MDBCard style={{ maxWidth: '800px', width: '100%', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <MDBRow className="g-0">
                        {/* Left Side - Image */}
                        <MDBCol md="5">
                            <MDBCardImage
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2JdPl0Y6odWTTLuiu8CkQmgglFZ1nxoEGQ&s"
                                alt="Feedback"
                                className="img-fluid rounded-start"
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </MDBCol>

                        {/* Right Side - Feedback Form */}
                        <MDBCol md="7">
                            <MDBCardBody>
                                <h3 className="text-center mb-4">Feedback</h3>
                                <form onSubmit={handleSubmit}>
                                    <MDBInput
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mb-3"
                                        
                                    />
                                    <MDBTextArea
                                        label="Feedback Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="mb-3"
                                    />

                                    {/* Star Rating System */}
                                    <div className="text-center mb-3">
                                        <h5>Rate The GreenCart</h5>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <MDBIcon
                                                key={star}
                                                fas
                                                icon="star"
                                                size="2x"
                                                className={formData.rating >= star ? "text-warning" : "text-muted"}
                                                style={{ cursor: "pointer", marginRight: "5px" }}
                                                onClick={() => handleRatingChange(star)}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center">
                                        <MDBBtn color="primary" type="submit">
                                            Submit Feedback
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default Feedback;