import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Cards from "../components/card";
import SearchBar from "../components/searchBar";
import { useLocation, useNavigate } from "react-router-dom";
import AddCategoryModal from "../components/addCategoryModel"; 

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("categoryname") || "";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories?categoryname=${categoryQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch category");

      const jsonData = await response.json();
      setCategoryData(jsonData.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
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
          alignItems: "center",
        }}
      >
        All Available Categories
        {userRole === "admin" ? (
          <Button onClick={handleOpen} variant="contained">
            Add New Category
          </Button>
        ) : null}
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
        <Box>
          <h1>No Category Found!</h1>
        </Box>
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

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <Cards products={category.products} />
            </Box>
          </Box>
        ))
      )}
      <AddCategoryModal
        open={open}
        handleClose={handleClose}
        onCategoryAdded={fetchCategoryData}
      />
    </>
  );
}
