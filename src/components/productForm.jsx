import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";

export default function ProductForm({ initialProduct, onSubmit, buttonText, isUpdate }) {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialProduct.image_url || null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const jsonData = await response.json();
        if (!response.ok) throw new Error(jsonData.message||"Failed to fetch categories");

        setCategories(jsonData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert(error.message)
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setImage((prev) => {
        return file;
      });
      setImagePreview(URL.createObjectURL(file));
    }
  }; 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(product, image);
  };

  return (
    <Box sx={{ width: "400px", margin: "auto", padding: "20px", boxShadow: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {buttonText}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          required={!isUpdate} 
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required={!isUpdate} 
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          required={!isUpdate} 
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          fullWidth
          required={!isUpdate} 
          sx={{ marginBottom: 2 }}
        />
        <TextField
          select
          label="Category"
          name="category_id"
          value={product.category_id}
          onChange={handleChange}
          fullWidth
          required={!isUpdate} 
          sx={{ marginBottom: 2 }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="text" component="span" color="primary">
            Upload Image
          </Button>
        </label>

        {imagePreview && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ display: "block", mx: "auto", marginTop: 2 }}>
          {buttonText}
        </Button>
      </form>
    </Box>
  );
}
