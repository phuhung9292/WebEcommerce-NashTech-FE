import React from "react";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Products from "../Components/Products";
import ProductDetail from "../Components/pages/ProductDetails";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Slider />
      <Products />
      {/* <ProductDetail/> */}
    </div>
  );
};

export default Home;
