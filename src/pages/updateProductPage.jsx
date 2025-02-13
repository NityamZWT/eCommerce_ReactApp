import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/productForm";

export default function UpdateProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const jsonData = await response.json();

        if (!response.ok) throw new Error(jsonData.message||"Failed to fetch product");

        setProduct({
          name: jsonData.data.name || "",
          description: jsonData.data.description || "",
          price: jsonData.data.price || "",
          stock: jsonData.data.stock || "",
          category_id: jsonData.data.category_id || "",
          image_url: jsonData.data.image_url ? `http://localhost:3000/images/${jsonData.data.image_url}` : null,
        });
      } catch (error) {
        // console.error("Error fetching product:", error);
        alert(error.message)
      }
    }

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedProduct, image) => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();
    const {image_url, ...finalProduct} = updatedProduct 
    Object.keys(finalProduct).forEach((key) => {
      formData.append(key, finalProduct[key]);
    });

    if (image){
      console.log('inside--',image);
      formData.append("productimage", image);
    }
      
    console.log('formDat---',formData);
    
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const jsonData = await response.json()
      if (!response.ok) throw new Error(jsonData.message||"Failed to update product");

      alert("Product updated successfully!");
      navigate('/products')
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message)
    }
  };

  return product ? <ProductForm initialProduct={product} onSubmit={handleUpdateProduct} buttonText="Update Product" isUpdate={true} /> : <p>Loading...</p>;
}
