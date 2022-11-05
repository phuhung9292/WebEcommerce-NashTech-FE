import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import ProgressBar from "../ProgressBar";
import Button from "@mui/material/Button";
import useStorage from "../../hooks/useStorage";

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
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState(null);
  const type = ["image/png", "image/jpeg"];
  // const { url, progress } = useStorage(file);
  const [formCreateProduct, setFormCreateProduct] = useState({
    cateid: { id },
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

  const add = () => {
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
                Name Product
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
                Descirption
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
              Upload
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
          <button
            class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
            onClick={() => {
              add();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
