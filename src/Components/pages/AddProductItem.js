import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import useStorage from "../../hooks/useStorage";
import ProductService from "../../Services/ProductService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

function AddProductItem() {
  const { productid } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const type = ["image/png", "image/jpeg"];
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
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
      await ProductService.adminGetAllColorAndSizeByCateId(productid).then(
        (res) => {
          setColor(res.data.Color);
          setSize(res.data.Size);
          console.log(productid);
        }
      );
    };
    fetchData();
  }, [productid]);
  const add = async () => {
    await ProductService.adminCreateProductItem(
      productid,
      formCreateProductItem.variation1,
      formCreateProductItem.variation2,
      formCreateProductItem.quantity,
      formCreateProductItem.price,
      formCreateProductItem.productImage
    )
      .then((res) => {
        alert("Add success");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        // console.log(err);
      });
    // console.log(formCreateProduct);
  };
  const [formCreateProductItem, setFormCreateProductItem] = useState({
    productid: { productid },
    quantity: "",
    variation1: "",
    variation2: "",
    price: "",
    productImage: "",
  });
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
              <input
                type="text"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) =>
                  setFormCreateProductItem({
                    ...formCreateProductItem,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label for="email" class="block mb-1 text-gray-600 font-semibold">
                Price <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                onChange={(e) =>
                  setFormCreateProductItem({
                    ...formCreateProductItem,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Color"
                    onChange={(e) => {
                      setFormCreateProductItem({
                        ...formCreateProductItem,
                        variation1: e.target.value,
                      });
                    }}
                  >
                    {color.map((item) => {
                      return <MenuItem value={item.id}>{item.value}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Color"
                    onChange={(e) => {
                      setFormCreateProductItem({
                        ...formCreateProductItem,
                        variation2: e.target.value,
                      });
                    }}
                  >
                    {size.map((item) => {
                      return <MenuItem value={item.id}>{item.value}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
            {formCreateProductItem.productImage && (
              <div className="h-32 w-40">
                <img src={formCreateProductItem.productImage} />
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
                  setFormCreateProduct={setFormCreateProductItem}
                />
              )}
            </div>
          </div>
          {formCreateProductItem.productImage &&
          formCreateProductItem.price &&
          formCreateProductItem.variation1 &&
          formCreateProductItem.variation2 &&
          formCreateProductItem.quantity ? (
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

export default AddProductItem;
