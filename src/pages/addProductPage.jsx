import ProductForm from "../components/productForm";

export default function AddProductPage() {
  const initialProduct = { name: "", description: "", price: "", stock: "", category_id: "" };

  const handleAddProduct = async (product, image) => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (image) formData.append("productimage", image);

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return <ProductForm initialProduct={initialProduct} onSubmit={handleAddProduct} buttonText="Add Product" isUpdate={false} />;
}
