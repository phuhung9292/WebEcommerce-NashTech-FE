import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductService from "../Services/ProductService";
import Grid from "@mui/material/Grid";
export default function Products() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [productBestSeller, setProductBestSeller] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getProductBestSeller().then((res) => {
        console.log(res.data);
        setProductBestSeller(res.data);
      });
    };
    fetchData();
  }, []);
  return (
    <>
      {productBestSeller.length > 0 && (
        <div className="">
          <h2>Best Seller</h2>
          <Grid container spacing={2}>
            {productBestSeller.map((product) => (
              <Grid item md={4}>
                <Link key={product.id} to={`/productDetail/${product.id}`}>
                  <div class="card">
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{product.name}</h5>
                      <p class="card-text"> {product.description}</p>
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <h2>All Products</h2>
      {!loading && (
        <div>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item md={4}>
                <Link key={product.id} to={`/productDetail/${product.id}`}>
                  <div class="card">
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{product.name}</h5>
                      <p class="card-text"> {product.description}</p>
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
