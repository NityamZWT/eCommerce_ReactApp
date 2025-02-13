import React, { useEffect, useState } from "react";
import {Box} from "@mui/material";
import OrderCard from "../components/orderCard";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
 
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const jsonData = await response.json();
        if (!response.ok)
          throw new Error(jsonData.message || "Failed to fetch orders");

        setOrders(jsonData.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#1976d2",
          fontSize: "36px",
          fontWeight: "700",
          borderBottom: "1px solid #1976d2",
          width: "100%",
          textAlign: "center",
        }}
      >
        Order History
      </Box>

      {orders.map((order) => (
        <OrderCard order={order}/>
      ))}
    </Box>
  );
}
