import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";

import Categories from "../pages/categoryPage";
import ProductPage from "../pages/productPage";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path='/products' element ={<ProductPage/>}/>
    </Routes>
  );
}
