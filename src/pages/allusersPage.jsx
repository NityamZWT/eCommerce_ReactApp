import { Directions, Padding, WidthFull } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AllUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function handleAllUsers() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to get all users");

        const jsonData = await response.json();
        setUsers(jsonData.data);

      } catch (error) {
        console.error("Error getting Users :", error);
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
