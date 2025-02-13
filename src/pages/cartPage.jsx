import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    handleGetCart();
  }, []);

  async function handleGetCart() {
    try {
      const response = await fetch(`http://localhost:3000/api/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("failed to get cart(server error)");

      const jsonData = await response.json();
      // console.log(jsonData.data.cartData[0].quantity);

      setCarts(jsonData.data.cartData);
      setTotalAmount(jsonData.data.TotalPrice);
      // setQuantity(jsonData)
    } catch (error) {
      console.error("failed to get cart :", error);
    }
  }

  const handleDeleteCart = async (e, cartId) => {
    e.stopPropagation();
    try {
      const confirmed = window.confirm(
        "Are you sure you want to remove this item?"
      );
      if (!confirmed) return;

      const response = await fetch(`http://localhost:3000/api/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete item");

      handleGetCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleUpdateQuantity = async (e, id, newQuantity) => {
    e.stopPropagation();
    try {
      if (newQuantity < 1) return;

      const response = await fetch(`http://localhost:3000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const jsonData = await response.json()
      if (!response.ok) throw new Error(jsonData.message||"Failed to update quantity");

      handleGetCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert(error.message)
    }
  };

  const handleCreateOrder = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Please log in to place an order!");
        navigate('/login')
        return;
      }
  
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const jsonData = await response.json();
  
      if (!response.ok) {
        throw new Error(jsonData.message || "Failed to create order");
      }
  
      alert("Order placed successfully!");
      navigate('/') 

    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
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
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          padding: 2,
        }}
      >
        {carts.map((cart) => (
          <Card
            key={cart.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              width: "60%",
              marginX: "auto",
              gap: "30px",
            }}
            onClick={() => navigate(`/productDetail/${cart.product_id}`)}
          >
            <CardMedia
              component="img"
              alt={cart.product.name}
              height="150"
              image={`http://localhost:3000/images/${cart.product.image_url}`}
              sx={{ flex: 1,borderRadius: "8px", marginRight: 2 }}
            />
            <Box sx={{ flex: 3 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {cart.product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {cart.product.description}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "30px",
                  // marginTop: "20px",
                  fontSize: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    width: "fit-content",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      handleUpdateQuantity(e, cart.id, cart.quantity - 1)
                    }
                    disabled={cart.quantity <= 1}
                    sx={{ minWidth: "40px", height: "40px" }}
                  >
                    -
                  </Button>

                  <Typography
                    variant="h6"
                    sx={{ minWidth: "40px", textAlign: "center" }}
                  >
                    {cart.quantity}
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={(e) =>
                      handleUpdateQuantity(e, cart.id, cart.quantity + 1)
                    }
                    sx={{ minWidth: "40px", height: "40px" }}
                  >
                    +
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      handleDeleteCart(e, cart.id);
                    }}
                    sx={{ minWidth: "40px", height: "45px", bgcolor: "white" }}
                  >
                    <IconButton color="error">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          bottom: 0,
          width: "60%",
          backgroundColor: "white",
          padding: 2,
          textAlign: "center",
        //   fontWeight: "bold",
          borderTop: "1px solid #ccc",
          marginX:'auto'
        }}
      >
        <Box sx={{display:'flex', gap:'10px'}}>
          <Box>Total Amount To Pay:</Box>
          <Box sx={{fontWeight: "bold"}}>₹ {totalAmount}</Box>
        </Box>
        <Button variant="contained" onClick={handleCreateOrder}>Place Order</Button>
      </Box>
    </Box>
  );
}
