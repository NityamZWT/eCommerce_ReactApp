import { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();

      if (!response.ok) throw new Error(jsonData.message||"Failed to register new user!");

      localStorage.setItem("jwtToken", jsonData.data.Token);

      const decodedToken = jwtDecode(jsonData.data.Token);

      localStorage.setItem('userRole',decodedToken.role)
      localStorage.setItem('userName', decodedToken.name)

      navigate('/')
    } catch (error) {
      console.error("Error fetching products:", error);
      alert(error.message)
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
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
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
