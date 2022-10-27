import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../Services/ProductService";

export default function Products() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  // const ProductList = () => {

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProducts();
        // console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {!loading && (
        <div className="col-md-3">
          {products.map((product) => (
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text"> {product.description}</p>
                <a href="" class="btn btn-primary">
                  {" "}
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
