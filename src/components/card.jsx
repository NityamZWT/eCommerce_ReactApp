import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CardActionsComponent from "./cardAction"; 

export default function Cards({ products, currentProduct }) {
  if (!products || products.length === 0) return <p>No products available</p>;

  const navigate = useNavigate();

  
  return (
    <>
      {products.map((product) => (
        product.id !== parseInt(currentProduct) &&
        <Card
          key={product.id}
          sx={{ display: "flex", flexDirection: "column", marginBlock: 2 }}
          onClick={() => navigate(`/productDetail/${product.id}`)}
        >
          <CardMedia
            component="img"
            alt={product.name}
            height="150"
            image={`http://localhost:3000/images/${product.image_url}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.description}
            </Typography>
          </CardContent>
          <CardActionsComponent productId={product.id} ProductName={product.name}/> 
        </Card>
      ))}
    </>
  );
}
