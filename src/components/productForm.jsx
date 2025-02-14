import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";

export default function ProductForm({ initialProduct, onSubmit, buttonText, isUpdate }) {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialProduct.image_url || null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${import.meta.env.VITE_CATEGORIES_API}`);
        const jsonData = await response.json();
        if (!response.ok) throw new Error(jsonData.message || "Failed to fetch categories");

        setCategories(jsonData.data);
      } catch (error) {
        setErrors({ server: error.message });
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

    // Clear error when user types
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!product.name.trim()) validationErrors.name = "Product name is required";
    if (!product.description.trim()) validationErrors.description = "Description is required";
    if (!product.price || product.price <= 0) validationErrors.price = "Valid price is required";
    if (!product.stock || product.stock < 0) validationErrors.stock = "Valid stock count is required";
    if (!product.category_id) validationErrors.category_id = "Category is required";
    if (!image && !isUpdate) validationErrors.image = "Product image is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(product, image, setErrors);
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
          // required={!isUpdate}
          error={!!errors.name}
          helperText={errors.name}
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
          // required={!isUpdate}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          // required={!isUpdate}
          error={!!errors.price}
          helperText={errors.price}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          fullWidth
          // required={!isUpdate}
          error={!!errors.stock}
          helperText={errors.stock}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          select
          label="Category"
          name="category_id"
          value={product.category_id}
          onChange={handleChange}
          fullWidth
          // required={!isUpdate}
          error={!!errors.category_id}
          helperText={errors.category_id}
          sx={{ marginBottom: 2 }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <input accept="image/*" type="file" onChange={handleImageChange} style={{ display: "none" }} id="image-upload" />
        <label htmlFor="image-upload">
          <Button variant="text" component="span" color="primary">
            Upload Image
          </Button>
        </label>

        {errors.image && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.image}
          </Typography>
        )}

        {imagePreview && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }} />
          </Box>
        )}

        {errors.server && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.server}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" sx={{ display: "block", mx: "auto", marginTop: 2 }}>
          {buttonText}
        </Button>
      </form>
    </Box>
  );
}
