import React, { useEffect, useState } from "react";
import Cards from "../components/card";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [productData, setProductData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const queryParams = new URLSearchParams(location.search);
  
  const searchQuery = queryParams.get("productname") || ""; 
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products?productname=${searchQuery}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const jsonData = await response.json();
        setProductData(jsonData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [searchQuery]); 

  return (
    <>
      {productData.length === 0 ? (
        <Box sx={{display:'flex', width:'100%', justifyContent:'space-between'}}>
        <Box sx={{ color: "#1976d2", fontSize: "36px", fontWeight: "700" }}>
          No Product Found!
        </Box>
        {userRole !=='admin'?<Button variant="contained" onClick={() => navigate("/addproduct")}>Add New Product</Button>:undefined}
        
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center' }}>
        <Box sx={{ color: "#1976d2", fontSize: "36px", fontWeight: "700" }}>
          Latest Products
        </Box>
        {userRole ==='admin'?<Button variant="contained" onClick={() => navigate("/addproduct")}>Add New Product</Button>:undefined}
        </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingTop: "30px",
              gap:'30px'
            }}
          >
            <Cards products={productData} />
          </Box>
        </Box>
      )}
    </>
  );
}
