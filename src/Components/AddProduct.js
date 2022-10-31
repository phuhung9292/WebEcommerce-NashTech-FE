import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";

const AddProduct = () => {
  const [product, setProduct] = useState({
    categoryId: "",
    name: "",
    description: "",
    productImage: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };
  return (
    <div>
      {/* <NavbarAdmin /> */}
      <div className="flex max-w-2xl shadow mx-auto border-b">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1>New Product</h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              categoryId
            </label>
            <select className="h-10 w-96 border mt-2 px-2 py-2">
              <option></option>
            </select>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              Name Product
            </label>
            <input
              type="text"
              className="block text-gray-600 text-sm font-normal"
            ></input>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              Description
            </label>
            <input
              type="text"
              className="block text-gray-600 text-sm font-normal"
            ></input>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              selectImage
            </label>
            <input
              type="file"
              className="block text-gray-600 text-sm font-normal"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
