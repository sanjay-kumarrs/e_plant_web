import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import {
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTypography
} from 'mdb-react-ui-kit';


const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch all feedbacks
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getFeedbacks');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('❌ Error fetching feedbacks:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            alert("❌ Error: Feedback ID is missing!");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await axios.delete(`http://localhost:8080/deleteFeedback/${id}`);
            alert("✅ Feedback deleted successfully!");
            setFeedbacks(feedbacks.filter(feedback => feedback._id !== id)); // Update state after deletion
        } catch (error) {
            console.error("❌ Error deleting feedback:", error);
            alert("❌ Failed to delete feedback.");
        }
    };

    return (
        <div>
            <AdminNavbar/>
            <MDBContainer className="mt-5">
                <MDBCard className="shadow-lg">
                <MDBCardHeader className="bg-primary text-white d-flex align-items-center">
    <img 
        src="https://tse3.mm.bing.net/th?id=OIP.igAl06FZ0ohPEfYBHbw0wwHaE_&pid=Api&P=0&h=180" 
        alt="Feedback Icon" 
        className="me-3" 
        style={{ width: "100px", height: "100px", borderRadius: "50%" }} 
    />
    <MDBTypography tag="h3" className="mb-0">Feedbacks</MDBTypography>
</MDBCardHeader>

                    <MDBCardBody>
                        <MDBTable hover responsive className="align-middle">
                            <MDBTableHead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {feedbacks.length > 0 ? feedbacks.map((feedback, index) => (
                                    <tr key={feedback._id}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>{feedback.email}</td>
                                        <td>{feedback.message}</td>
                                        <td>
                                            {[...Array(feedback.rating)].map((_, i) => (
                                                <MDBIcon key={i} fas icon="star" className="text-warning me-1" />
                                            ))}
                                        </td>
                                        <td>
                                            <MDBBtn color="danger" size="sm" onClick={() => handleDelete(feedback._id)}>
                                                <MDBIcon fas icon="trash" /> Delete
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">No feedback available.</td>
                                    </tr>
                                )}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default AdminFeedback;