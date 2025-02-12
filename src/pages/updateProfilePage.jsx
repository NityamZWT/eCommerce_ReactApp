import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to get profile");

        const jsonData = await response.json();
        setProfile(jsonData.data[0]);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value} );
    
  };

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { role, ...updatedProfile } = profile;
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      navigate("/userprofile"); 
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Update Profile
      </Typography>

      <TextField
        label="First Name"
        name="first_name"
        value={profile.first_name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={profile.last_name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        fullWidth 
      />
      <TextField
        label="Role"
        name="role"
        value={profile.role}
        // onChange={handleChange}
        fullWidth
        disabled 
      />

      <Button variant="contained" color="primary" onClick={handleUpdateProfile} fullWidth>
        Save Changes
      </Button>
      <Button variant="outlined" onClick={() => navigate("/profile")} fullWidth>
        Cancel
      </Button>
    </Box>
  );
}
