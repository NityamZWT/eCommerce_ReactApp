import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Wishlist (Outlined)
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"; // Like (Outlined)
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"; // Share (Outlined)
import Typography from "@mui/material/Typography";

export default function Cards({ products }) {
  if (!products || products.length === 0) return <p>No products available</p>;

  return (
    <>
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{ display: "flex", flexDirection: "column", margin: 2 }}
        >
          <CardMedia
            component="img"
            alt={product.name}
            height="150"
            // Width="300"
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
          <CardActions sx={{ display: "block", mt: "auto" }}>
            <Button
              sx={{
                color: "white",
                paddingInline:'1rem',
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "darkblue" },
              }}
              size="small"
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
          </CardActions>
        </Card>
      ))}
    </>
  );
}
