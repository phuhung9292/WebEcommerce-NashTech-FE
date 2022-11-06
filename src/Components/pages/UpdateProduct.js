import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import ProductService from "../../Services/ProductService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useStorage from "../../hooks/useStorage";

const ProgressBar = ({ file, setFile, setFormNewProduct }) => {
  const { url, progress } = useStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setFormNewProduct((prev) => ({ ...prev, productImage: url }));
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div className="progress-bar" style={{ width: progress + "%" }}>
      progress
    </div>
  );
};
export default function UpdateProduct() {
  const { productid } = useParams();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState(null);
  const type = ["image/png", "image/jpeg"];
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [productId, setProductId] = useState("");
  const [cateId, setCateId] = useState("");

  const [formNewProduct, setFormNewProduct] = useState({
    id: "",
    cateid: "",
    name: "",
    description: "",
    productImage: "",
  });
  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && type.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("please select image (png or jpeg)");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getProductById(productid).then((res) => {
        console.log(res);

        setProductId(res.data.id);
        setName(res.data.name);
        setDescrip(res.data.description);
        setImage(res.data.productImage);
        setCateId(res.data.categoryId);
      });
    };
    fetchData();
  }, [productid]);
  useEffect(() => {}, [productId, name, descrip, image]);

  const add = () => {
    ProductService.updateProduct(
      productid,
      formNewProduct.name,
      formNewProduct.description,
      formNewProduct.productImage,
      cateId
    )
      .then((res) => {
        alert("Add success");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("add fail");
      });
    // console.log(formProduct);
  };
  return (
    <div>
      <div class="h-screen bg-gradient-to-br from-pink-600 to-indigo-600 flex justify-center items-center w-full">
        <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div class="space-y-4">
            <h1 class="text-center text-2xl font-semibold text-gray-600">
              Create new product
            </h1>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Name Product <span className="text-red-600">*</span>
              </label>
              <TextField
                label={name}
                id="outlined-size-small"
                size="small"
                // value={category}
                onChange={(e) =>
                  setFormNewProduct({
                    ...formNewProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Descirption <span className="text-red-600">*</span>
              </label>
              <TextField
                label={descrip}
                id="outlined-size-small"
                size="small"
                // value={category}
                onChange={(e) =>
                  setFormNewProduct({
                    ...formNewProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            {image && !formNewProduct.productImage && (
              <div className="h-32 w-40">
                <img src={image} />
              </div>
            )}
            {formNewProduct.productImage && (
              <div className="h-32 w-40">
                <img src={formNewProduct.productImage} />
              </div>
            )}
            <Button variant="contained" component="label">
              Upload <span className="text-red-600">*</span>
              <input type="file" onChange={handleChange} />
            </Button>

            <div className="output">
              {error && <div className="error">{error}</div>}
              {file && <div> {file.name} </div>}
              {file && (
                // {progress(file1,setFile1)}
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  setFormNewProduct={setFormNewProduct}
                />
              )}
            </div>
          </div>
          {formNewProduct.productImage &&
          formNewProduct.description &&
          formNewProduct.name ? (
            <button
              class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
              onClick={() => {
                add();
              }}
            >
              Update
            </button>
          ) : (
            <Button variant="contained" disabled>
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
