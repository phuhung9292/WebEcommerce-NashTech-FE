import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail(props) {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);

  console.log(productid);

  return <h1>{productid}</h1>;
}

export default ProductDetail;
