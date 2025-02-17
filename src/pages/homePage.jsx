import { useEffect, useState } from "react";
import Cards from "../components/card";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [productData, setProductData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductData() {
      try {
        const limit=4;
        const response = await fetch(`${import.meta.env.VITE_PRODUCTS_API}?limit=${limit}`);
        const jsonData = await response.json();

        if (!response.ok) throw new Error(jsonData.message||"Failed to fetch products");

        setProductData(jsonData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert(error.message)
      }
    }
    async function fetchCategoryData() {
      try {
        const limit=4;
        const response = await fetch(`${import.meta.env.VITE_CATEGORIES_API}?limit=${limit}`);
        const jsonData = await response.json();
        
        if (!response.ok) throw new Error(jsonData.message||"Failed to fetch category");

        setCategoryData(jsonData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert(error.message)
      }
    }

    fetchProductData();
    fetchCategoryData();
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ color: "#1976d2", fontSize: "36px", fontWeight: "700", borderBottom:'1px solid #1976d2', width:'100%', textAlign:'center' }}>
        Hey! Welcome to eCommerce
      </Box>
      <Box
        sx={{
          color: "#1976d2",
          fontSize: "36px",
          fontWeight: "600",
          paddingTop: "30px",
          alignSelf:'flex-start'
        }}
      >
        Products
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
      <Box
        sx={{
          color: "#1976d2",
          cursor:"pointer"
        }} 
        onClick={() => navigate("/products")}
      >
        more Products...
      </Box>
      <Box
        sx={{
          color: "#1976d2",
          fontSize: "36px",
          fontWeight: "600",
          paddingTop: "30px",
          alignSelf:'flex-start'
        }}
      >
        Categories
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          paddingTop: "30px",
          width: "100%",
        }}
      >
        {categoryData.map((category) => (
          <Box
            key={category.id}
            sx={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
              padding: "2rem",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);",
              color: "#1976d2",
              fontSize: "26px",
              cursor:'pointer'
              // fontWeight:'600'
            }}
            onClick={() => navigate(`/categories?categoryname=${category.name}`)}
          >
            {category.name}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          color: "#1976d2",
          paddingTop:'20px',
          cursor:"pointer"
        }}
        onClick={() => navigate("/categories")}
      >
        All categories with products...
      </Box>
    </Box>
  );
}
