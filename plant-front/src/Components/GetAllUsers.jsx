import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/allUserProfiles")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8080/deleteUser/${id}`)
        .then((res) => {
          if (res.data.status === "success") {
            alert("User deleted successfully!");
            fetchUsers(); // Refresh the list
          } else {
            alert(res.data.message || "Failed to delete user");
          }
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("Server error. Could not delete user.");
        });
    }
  };

  if (loading)
    return (
      <MDBSpinner
        color="primary"
        className="d-flex justify-content-center mt-5"
      />
    );

  if (users.length === 0)
    return (
      <MDBContainer className="py-5">
        <h3 className="text-center text-danger">No Users Found</h3>
      </MDBContainer>
    );

  return (
    <div>
      <AdminNavbar />
      <MDBContainer className="py-5">
        <h2 className="text-center mb-4 text-primary">Registered Users</h2>
        <MDBRow className="g-4">
          {users.map((user) => (
            <MDBCol md="4" sm="6" xs="12" key={user._id}>
              <MDBCard className="shadow-lg rounded-4 hover-shadow p-3">
                <div className="text-center mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Profile Icon"
                    className="rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <MDBCardBody className="text-center">
                  <MDBCardTitle className="mb-2">{user.name}</MDBCardTitle>
                  <MDBCardText>
                    <MDBIcon fas icon="user" className="me-2 text-primary" />
                    {user.username} <br />
                    <MDBIcon
                      fas
                      icon="envelope"
                      className="me-2 text-danger"
                    />
                    {user.email}
                  </MDBCardText>
                  <MDBBtn
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default GetAllUsers;