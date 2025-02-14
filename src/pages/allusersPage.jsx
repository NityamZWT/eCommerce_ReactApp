import { Directions, Padding, WidthFull } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AllUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function handleAllUsers() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${import.meta.env.VITE_USERS_API}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonData = await response.json()
        if (!response.ok) throw new Error(jsonData.message||"Failed to get all users");

        setUsers(jsonData.data);

      } catch (error) {
        // console.error("Error getting Users :", error);
        alert(error.message)
      }
    }
    handleAllUsers();
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ fontWeight: "bold" }}>First Name:</Box>
            
            <Box>{user.first_name}</Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ fontWeight: "bold" }}>Last Name: </Box>
            <Box>{user.last_name}</Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ fontWeight: "bold" }}>Email Address: </Box>
            <Box>{user.email}</Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Box sx={{ fontWeight: "bold" }}>Role: </Box>
            <Box>{user.role}</Box>
          </Box>

          <hr />
        </Box>
      ))}
    </>
  );
}
