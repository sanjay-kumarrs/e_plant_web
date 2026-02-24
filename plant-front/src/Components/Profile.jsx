import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBSpinner
} from "mdb-react-ui-kit";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/userProfile?email=${email}`)
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
          setEditedUser(res.data.data);
        } else {
          console.error("Profile fetch error:", res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [email]);

  const handleEditToggle = () => setEditing(!editing);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put("http://localhost:8080/updateProfile", editedUser)
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
          setEditing(false);
          alert("Profile updated successfully!");
        } else {
          alert(res.data.message || "Failed to update profile");
        }
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (loading)
    return <MDBSpinner color="primary" className="d-flex justify-content-center mt-5" />;

  if (!user)
    return (
      <MDBTypography tag="h2" className="text-center mt-4 text-danger">
        No Profile Found
      </MDBTypography>
    );

  return (
    <MDBContainer className="py-5">
      <MDBCard className="shadow-lg rounded-4">
        <MDBCardBody>
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-vector-edit-profile-icon-png-image_760869.jpg"
              alt="Profile Icon"
              className="me-3 rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
            <MDBTypography tag="h2" className="text-primary">
              Welcome, {user.name}
            </MDBTypography>
          </div>

          <MDBRow className="mb-3">
            <MDBCol md="6">
              <strong>Name:</strong>
              {editing ? (
                <MDBInput name="name" value={editedUser.name} onChange={handleChange} />
              ) : (
                user.name
              )}
            </MDBCol>
            <MDBCol md="6">
              <strong>Username:</strong>
              {editing ? (
                <MDBInput name="username" value={editedUser.username} onChange={handleChange} />
              ) : (
                user.username
              )}
            </MDBCol>
            <MDBCol md="6">
              <strong>Email:</strong>
              {editing ? (
                <MDBInput name="email" value={editedUser.email} onChange={handleChange} />
              ) : (
                user.email
              )}
            </MDBCol>
          </MDBRow>

          <MDBBtn color="primary" onClick={handleEditToggle} className="me-2">
            {editing ? "Cancel" : "Edit"}
          </MDBBtn>
          {editing && (
            <MDBBtn color="success" onClick={handleSave}>
              Save
            </MDBBtn>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Profile;
