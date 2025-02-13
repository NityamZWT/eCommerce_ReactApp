import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import ProfileForm from "../components/profileForm";

export default function RegistrationForm() {
const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "customer",
}

  const navigate = useNavigate();


  const handleSubmit = async(formData) => {
    // e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/auth/register',{
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
              },
              body: JSON.stringify(formData),
        })
        const jsonData = await response.json()
        if(!response.ok) throw new Error(jsonData.message || "Failed to register new user!");

        navigate('/login')
        
    } catch (error) {
        console.error("Error fetching products:", error);
        alert(error.message)
    }
  };

  return (
    <ProfileForm handleSubmit={handleSubmit} initialFormData={initialFormData}/>
  );
}
