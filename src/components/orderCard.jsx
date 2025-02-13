import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function OrderCard({ order, handleUpdateStatus }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  return (
    <>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              Total Price: ₹ {order.total_price}
            </Typography>
          </Box>
          {userRole === "customer" && (
            <Box sx={{ alignSelf: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  color:
                    (order.status === "pending" && "red") ||
                    (order.status === "delivered" && "green") ||
                    "grey",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {order.status}
              </Typography>
            </Box>
          )}
        </Box>

        {order.oder_item.map((item) => (
          <>
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/productdetail/${item.product.id}`);
              }}
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
          </>
        ))}
        {userRole === "admin" && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Button variant="outlined" onClick={()=>{handleUpdateStatus(order.id, 'shipped')}}>shipped</Button>
            <Button variant="outlined" color="error"  onClick={()=>{handleUpdateStatus(order.id, 'canceled')}}>
              canceled
            </Button>
            <Button variant="contained"  onClick={()=>{handleUpdateStatus(order.id, 'delivered')}}>delivered</Button>
          </Box>
        )}
      </Card>
    </>
  );
}
