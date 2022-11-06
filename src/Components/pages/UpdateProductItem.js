import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import useStorage from "../../hooks/useStorage";
import ProductService from "../../Services/ProductService";

import TextField from "@mui/material/TextField";

const ProgressBar = ({ file, setFile, setImage }) => {
  const { url, progress } = useStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setImage(url);
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div className="progress-bar" style={{ width: progress + "%" }}>
      progress
    </div>
  );
};

function UpdateProductItem() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const type = ["image/png", "image/jpeg"];
  const { productItemId } = useParams();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
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
      await ProductService.getProductItemByProductItemId(productItemId).then(
        (res) => {
          console.log(res);
          setQuantity(res.data.quantity);
          setPrice(res.data.price);
          setImage(res.data.productImage);
        }
      );
    };
    fetchData();
  }, [productItemId]);
  const add = async () => {
    await ProductService.updateProductItem(
      productItemId,
      quantity,
      price,
      image
    )
      .then((res) => {
        alert("update success");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        // console.log(err);
      });
    // console.log(formCreateProduct);
  };
  return (
    <div>
      <div class="h-screen bg-gradient-to-br from-pink-600 to-indigo-600 flex justify-center items-center w-full">
        <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div class="space-y-4">
            <h1 class="text-center text-2xl font-semibold text-gray-600">
              Create new product Item
            </h1>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Quantity <span className="text-red-600">*</span>
              </label>
              <TextField
                label={quantity}
                id="outlined-size-small"
                size="small"
                // value={category}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Price <span className="text-red-600">*</span>
              </label>
              <TextField
                label={price}
                id="outlined-size-small"
                size="small"
                // value={category}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {image && (
              <div className="h-32 w-40">
                <img src={image} />
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
                  setImage={setImage}
                />
              )}
            </div>
          </div>
          {image && price && quantity ? (
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

export default UpdateProductItem;
