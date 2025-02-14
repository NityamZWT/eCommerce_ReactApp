import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/card";
import CardActionsComponent from "../components/cardAction";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const userRole = localStorage.getItem('userRole')

  const { productId } = useParams();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTS_API}${productId}`
        );
        const jsonData = await response.json();

        if (!response.ok) throw new Error(jsonData.message||"Failed to fetch product details");

        setProduct(jsonData.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert(error.message)
      }
    }

    fetchProduct();
  }, [productId]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!product) {
    return (
      <Box
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        Loading Product Details...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}
      >
        {product.name}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${product.image_url}`}
          alt={product.name}
          style={{ maxWidth: "400px", borderRadius: "10px" }}
        />
      </Box>

      <Box sx={{ maxWidth: "400px", marginX: "auto", paddingTop: "20px" }}>
        <CardActionsComponent
          productId={product.id}
          ProductName={product.name}
          quantity={quantity}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          justifyContent: "center",
          marginX: "auto",
        }}
      >
        {product.description === null ? (
          <Box sx={{ display: "none" }}></Box>
        ) : (
          <Box>
            <Typography
              variant="h5"
              sx={{ marginTop: "30px", fontWeight: "bold" }}
            >
              Description
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              {product.description}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            fontSize: "20px",
          }}
        >
          <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
            Price: ${product.price}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: product.stock > 0 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{ marginTop: "30px", fontWeight: "bold", color: "#1976d2" }}
        >
          Category: {product.category.name}
        </Typography>
        {userRole !== 'admin' && 
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            fontSize: "20px",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ marginTop: "30px", fontWeight: "bold" }}
            >
              Quantity
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px 10px",
              width: "fit-content",
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              sx={{ minWidth: "40px", height: "40px" }}
            >
              -
            </Button>

            <Typography
              variant="h6"
              sx={{ minWidth: "40px", textAlign: "center" }}
            >
              {quantity}
            </Typography>

            <Button
              variant="contained"
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              sx={{ minWidth: "40px", height: "40px" }}
            >
              +
            </Button>
          </Box>
        </Box>
        }
        {product.category.products === null ? (
          <Box sx={{ display: "none" }}></Box>
        ) : (
          <Box>
            <Typography
              variant="h5"
              sx={{ marginTop: "30px", fontWeight: "bold" }}
            >
              Related Products
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <Cards products={product.category.products} currentProduct={productId} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
