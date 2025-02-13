import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          alert("Please log in to view your orders!");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch orders");

        setOrders(data.data);
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
          justifyContent: "space-between",
          color: "#1976d2",
          fontSize: "36px",
          fontWeight: "700",
          borderBottom: "1px solid #1976d2",
          width: "100%",
          textAlign: "center",
        }}
      >
        Cart Items
      </Box>

      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            marginBottom: 3,
            padding: 3,
            width: "60%",
            marginX: "auto",
            marginTop: 2,
          }}
        >
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Box>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Total Price: ₹ {order.total_price}
              </Typography>
            </Box>
            <Box sx={{alignSelf:"center"}}>
                
              <Typography
                variant="body1"
                sx={{ color: "red", fontWeight: "600", fontSize:'18px' }}
              >
                {order.status}
              </Typography>
            </Box>
          </Box>

          {order.oder_item.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
              <CardMedia
                component="img"
                alt={item.product.name}
                height="80"
                image={`http://localhost:3000/images/${item.product.image_url}`}
                sx={{ width: "80px", borderRadius: "8px", marginRight: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1">{item.product.name}</Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Quantity: {item.quantity} | Price: ₹ {item.price}
                </Typography>
              </CardContent>
            </Box>
          ))}
        </Card>
      ))}
    </Box>
  );
}
