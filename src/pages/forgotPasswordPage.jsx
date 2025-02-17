import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [opt, setOpt] = useState(null);

  const handleOtp = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_USERS_API}forgotpassword/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, opt}),
      });
      const jsonData = await response.json()
      if(!response.ok) throw new Error(jsonData.data.messsage || 'something went wrong :', error)
        console.log('jsonData--', body);
        setIsDisabled(false)
        return;
    } catch (error) {
      alert(error.message || "servder error!");
    }
  };

  return (
    <>
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
          gap: "20px",
        }}
      >
        <Typography variant="h4">Forgot Password</Typography>
        <Box
          component="form"
          onSubmit={handleOtp}
          sx={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            sx={{ width: "100%" }}
            disabled={isDisabled}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            send OTP
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
    </>
  );
}
