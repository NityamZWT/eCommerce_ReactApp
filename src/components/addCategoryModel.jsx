import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

export default function AddCategoryModal({ open, handleClose, onCategoryAdded }) {
  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      setError("Category name is required");
      return;
    }

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`${import.meta.env.VITE_CATEGORIES_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || "Failed to add category");

      alert("Category added successfully!");
      setCategory({ name: "" });
      onCategoryAdded();
      handleClose();
    } catch (error) {
      setError(error.message);
      console.error("Error adding category:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Category Name"
              name="name"
              value={category.name}
              onChange={handleChange}
              fullWidth
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Category
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
