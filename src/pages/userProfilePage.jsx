import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

    const navigate = useNavigate();

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    async function handleProfile() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `${import.meta.env.VITE_USERS_API}profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();

        if (!response.ok) throw new Error(jsonData.message||"Failed to get all users");


        setProfile(jsonData.data[0]);
      } catch (error) {
        console.error("failed to get profile", error);
        alert(error.message)
      }
    }
    handleProfile();
  }, []);

  return (
    <>
    <Box sx={{display:'flex', flexDirection:'column', width:'100%',gap:'20px'}}>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          alignSelf:'center',
          marginRight:'350px'
        }}
        onClick={()=>{navigate('/updateprofile')}}
      >
        Update Profile
      </Button>

      <Box
        key={profile.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          paddingBlock:'30px',
          width: "60%",
          height: "100%",
          border:'2px solid black',
           marginX:'auto'
        }}
      >
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-evenly",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>First Name:</Box>

          <Box>{profile.first_name}</Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <hr />
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-evenly",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>Last Name: </Box>
          <Box>{profile.last_name}</Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <hr />
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-evenly",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>Email Address: </Box>
          <Box>{profile.email}</Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <hr />
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-evenly",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>Role: </Box>
          <Box>{profile.role}</Box>
        </Box>
      </Box>
      </Box>
    </>
  );
}
