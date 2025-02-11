import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/productForm";

export default function UpdateProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct({
          name: data.data.name || "",
          description: data.data.description || "",
          price: data.data.price || "",
          stock: data.data.stock || "",
          category_id: data.data.category_id || "",
          image_url: data.data.image_url ? `http://localhost:3000/images/${data.data.image_url}` : null,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    console.log('product---',product);
    
    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedProduct, image) => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();

    Object.keys(updatedProduct).forEach((key) => {
      formData.append(key, updatedProduct[key]);
    });

    if (image) formData.append("productimage", image);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return product ? <ProductForm initialProduct={product} onSubmit={handleUpdateProduct} buttonText="Update Product" isUpdate={true} /> : <p>Loading...</p>;
}
