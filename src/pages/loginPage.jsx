import { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.message || "Invalid credentials!");
      }

      localStorage.setItem("jwtToken", jsonData.data.Token);

      const decodedToken = jwtDecode(jsonData.data.Token);
      localStorage.setItem("userRole", decodedToken.role);
      localStorage.setItem("userName", decodedToken.name);

      navigate("/");
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: error.message }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4">Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "300px" }}>
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
          Login
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        New user?{" "}
        <Link
          component="button"
          onClick={() => navigate("/register")}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Register here
        </Link>
      </Typography>
    </Box>
  );
}
