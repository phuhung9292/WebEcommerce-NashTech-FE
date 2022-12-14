import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import ProgressBar from "../ProgressBar";
import Button from "@mui/material/Button";
import useStorage from "../../hooks/useStorage";
import ProductService from "../../Services/ProductService";

const ProgressBar = ({ file, setFile, setFormCreateProduct }) => {
  const { url, progress } = useStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setFormCreateProduct((prev) => ({ ...prev, productImage: url }));
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div className="progress-bar" style={{ width: progress + "%" }}>
      progress
    </div>
  );
};

function AddProduct() {
  const { cateid } = useParams();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState(null);
  const type = ["image/png", "image/jpeg"];
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  // const { url, progress } = useStorage(file);
  const [formCreateProduct, setFormCreateProduct] = useState({
    cateid: { cateid },
    name: "",
    description: "",
    productImage: "",
  });
  // useEffect(() => {
  //   if (url) {
  //     setFile(null);
  //   }
  // }, [url, setFile]);
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

  useEffect(() => {}, [formCreateProduct]);
  // useEffect(() => {
  //   setImage(formCreateProduct.productImage);
  // }, [formCreateProduct.productImage]);

  const add = () => {
    ProductService.adminAddProduct(
      cateid,
      formCreateProduct.name,
      formCreateProduct.description,
      formCreateProduct.productImage
    )
      .then((res) => {
        alert("Add success");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("add fail");
      });
    console.log(formCreateProduct);
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
              <input
                type="text"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) =>
                  setFormCreateProduct({
                    ...formCreateProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Descirption <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) =>
                  setFormCreateProduct({
                    ...formCreateProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            {formCreateProduct.productImage && (
              <div className="h-32 w-40">
                <img src={formCreateProduct.productImage} />
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
                  setFormCreateProduct={setFormCreateProduct}
                />
              )}
            </div>
          </div>
          {formCreateProduct.productImage &&
          formCreateProduct.description &&
          formCreateProduct.name ? (
            <button
              class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
              onClick={() => {
                add();
              }}
            >
              Create
            </button>
          ) : (
            <Button variant="contained" disabled>
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
