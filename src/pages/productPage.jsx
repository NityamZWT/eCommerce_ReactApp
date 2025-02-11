import React, { useEffect, useState } from "react";
import Cards from "../components/card";
import { Box } from "@mui/material";

export default function ProductPage() {

    const [productData, setProductData] = useState(null);
    
      useEffect(() => {
        async function fetchProductData() {
          try {
            const response = await fetch("http://localhost:3000/api/products");
            if (!response.ok) throw new Error("Failed to fetch products");
    
            const jsonData = await response.json();
            console.log("Fetched Data:", jsonData);
    
            setProductData(jsonData.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        }
    
        fetchProductData();
      }, []);
    
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ color: "#1976d2", fontSize: "36px", fontWeight:'700'}}>Latest Products!</Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingTop: "30px",
          }}
        >
          <Cards products={productData} />
        </Box>
      </Box>
    </>
  );
}
