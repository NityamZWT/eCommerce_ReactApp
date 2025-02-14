import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import OrderCard from "../components/orderCard";

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_ORDERS_API}allorders/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jsonData = await response.json();
        if (!response.ok)
          throw new Error(jsonData.message || "Failed to fetch orders");

        setOrders(jsonData.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert(error.message);
      }
    };

    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ORDERS_API}${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const jsonData = await response.json();
      if (!response.ok)
        throw new Error(jsonData.message || "Failed to fetch orders");

      window.location.reload();
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert(error.message);
    }
  };

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
        {orders.length === 0
          ? "No Order are in Pending stage"
          : "Pending Orders"}
      </Box>

      {orders.map((order) => (
        <OrderCard order={order} handleUpdateStatus={handleUpdateStatus} />
      ))}
    </Box>
  );
}
