import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Cards from "../components/card";

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch("http://localhost:3000/api/categories/");
        if (!response.ok) throw new Error("Failed to fetch category");

        const jsonData = await response.json();
        console.log("Fetched Data:", jsonData);

        setCategoryData(jsonData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategoryData();
  }, []);
  console.log("this ---", categoryData.data);

  return (
    <>
      {categoryData.length==0?<h1>No Category Found!</h1> : categoryData.map((category) => (
        <Box
          key={category.id}
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <h1>{category.name}</h1>
          <Box
            key={category.id}
            sx={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Cards products={category.products} />
          </Box>
        </Box>
      ))}
    </>
  );
}
