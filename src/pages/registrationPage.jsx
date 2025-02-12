import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/auth/register',{
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
              },
              body: JSON.stringify(formData),
        })
        if(!response.ok) throw new Error("Failed to register new user!");

        const jsonData = await response.json();
        navigate('/login')
        
    } catch (error) {
        console.error("Error fetching products:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "500px",
        margin: "auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center">Hey! Welcome</Typography>
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  );
}
