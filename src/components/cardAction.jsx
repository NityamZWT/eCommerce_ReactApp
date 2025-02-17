import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function CardActionsComponent({ productId, ProductName, quantity=1 }) {
  const userRole = localStorage?.getItem("userRole") || undefined;
  const navigate = useNavigate();

  const handleDeleteProduct = async (e, id) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete product name ${ProductName}`
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`${import.meta.env.VITE_PRODUCTS_API}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json()
      if (!response.ok) throw new Error(jsonData.message||"Failed to delete product");
      

      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message)
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token){
        navigate('/login')
        alert('please login first to use cart!')
        return;
      };
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id; 

      const cartData = {
        user_id: userId,
        product_id: productId,
        quantity: quantity
      };

      const response = await fetch(`${import.meta.env.VITE_CART_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });
      
      const jsonData = await response.json();
      
      if (!response.ok) throw new Error(jsonData.message||"Failed to add to cart");

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.message);
    }
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        gap: "10px",
        marginTop: "auto",
      }}
    >
      {userRole === "admin" ? (
        <>
          <Button
            sx={{
              color: "white",
              paddingInline: "1rem",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "darkblue" },
              flex: 1,
              width: "100%",
            }}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/updateproduct/${productId}`);
            }}
          >
            update
          </Button>
          <Button
            sx={{
              color: "white",
              paddingInline: "1rem",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "darkblue" },
              flex: 1,
            }}
            size="small"
            onClick={(e) => handleDeleteProduct(e, productId)}
          >
            Delete
          </Button>
        </>
      ) : (
        <>
          <Button
            sx={{
              color: "white",
              paddingInline: "1rem",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "darkblue" },
            }}
            size="small"
            onClick={(e)=>{handleAddToCart(e)}}
          >
            Add To Cart
          </Button>
          <Button size="small">
            <FavoriteBorderIcon />
          </Button>
          <Button size="small">
            <ShareOutlinedIcon />
          </Button>
          <Button size="small">
            <ThumbUpOffAltIcon />
          </Button>
        </>
      )}
    </div>
  );
}
