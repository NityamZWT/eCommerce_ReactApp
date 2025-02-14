import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    server: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.first_name.trim())
      validationErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      validationErrors.last_name = "Last name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
    if (formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();
      if (!response.ok)
        throw new Error(jsonData.message || "Failed to register new user!");

      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: error.message }));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: 2,
        width: "350px",
      }}
    >
      <Typography variant="h4">Register</Typography>

      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.first_name}
        helperText={errors.first_name}
      />

      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.last_name}
        helperText={errors.last_name}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />

      {errors.server && (
        <Typography color="error" sx={{ mt: 1 }}>
          {errors.server}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Box>
  );
}
