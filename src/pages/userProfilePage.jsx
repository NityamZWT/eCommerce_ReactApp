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
          "http://localhost:3000/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to get all users");

        const jsonData = await response.json();

        setProfile(jsonData.data[0]);
      } catch (error) {
        console.error("failed to get profile", error);
      }
    }
    handleProfile();
  }, []);
  console.log("profile---", profile);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          alignSelf:'center',
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
          width: "100%",
          height: "100%",
          border:'2px solid black'
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
    </>
  );
}
