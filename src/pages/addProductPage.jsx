import ProductForm from "../components/productForm";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const initialProduct = { name: "", description: "", price: "", stock: "", category_id: "" };
  const navigate = useNavigate();

  const handleAddProduct = async (product, image) => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (image) formData.append("productimage", image);

    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTS_API}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message||"Failed to add product");

      alert("Product added successfully!");
      window.location.reload()
      navigate('/addproduct')
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message)
    }
  };

  return <ProductForm initialProduct={initialProduct} onSubmit={handleAddProduct} buttonText="Add Product" isUpdate={false} />;
}
