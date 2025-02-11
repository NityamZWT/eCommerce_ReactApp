import { Box, Button, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/card";

export default function ProductDetail() {
  const { productId } = useParams();
  console.log("productId---", productId);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");

        const jsonData = await response.json();
        setProduct(jsonData.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProduct();
  }, [productId]);

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
          src={`http://localhost:3000/images/${product.image_url}`}
          alt={product.name}
          style={{ maxWidth: "400px", borderRadius: "10px" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <IconButton color="primary">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton color="primary">
          <ShareIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
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
              <Cards products={product.category.products} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
