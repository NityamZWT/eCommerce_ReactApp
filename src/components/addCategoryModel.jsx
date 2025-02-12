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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Failed to add category");

      alert("Category added successfully!");
      setCategory({ name: ""});
      onCategoryAdded(); 
      handleClose();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
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
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
