import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";

import Categories from "../pages/categoryPage";
import ProductPage from "../pages/productPage";
import ProductDetail from "../pages/productDetailPage";
import Login from "../pages/loginPage";
import RegistrationForm from "../pages/registrationPage";
import AddProductForm from "../pages/addProductPage";
import UpdateProductPage from "../pages/updateProductPage";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path='/products' element ={<ProductPage/>}/>
      <Route path='/productdetail/:productId' element ={<ProductDetail/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element ={<RegistrationForm/>}/>
      <Route path='/addproduct' element ={<AddProductForm/>}/>
      <Route path='/updateproduct/:id' element ={<UpdateProductPage/>}/>

    </Routes>
  );
}
