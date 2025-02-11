import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Cards from "../components/card";
import SearchBar from "../components/searchBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("categoryname") || "";

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/categories?categoryname=${categoryQuery}`
        );
        if (!response.ok) throw new Error("Failed to fetch category");

        const jsonData = await response.json();
        console.log("Fetched Data:", jsonData);

        setCategoryData(jsonData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategoryData();
  }, [categoryQuery]);

  return (
    <>
      <Box
        sx={{
          color: "#1976d2",
          fontSize: "36px",
          fontWeight: "700",
          width: "100%",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        All Available Categories
        <SearchBar
          searchType="categories"
          paramsName="categoryname"
          queryText={categoryQuery}
          inputColor="#1976d2"
          borderBottomColor="#1976d2"
          SearchIconColor="#1976d2"
        />
      </Box>

      {categoryData.length === 0 ? (
        <h1>No Category Found!</h1>
      ) : (
        categoryData.map((category) => (
          <Box
            key={category.id}
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                color: "#1976d2",
                fontSize: "32px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/categories?categoryname=${category.name}`)
              }
            >
              {category.name}
            </Box>

            <Box sx={{ width: "100%", display: "flex", flexDirection: "row",gap:'30px', flexWrap:'wrap' }}>
              <Cards products={category.products} />
            </Box>
          </Box>
        ))
      )}
    </>
  );
}
