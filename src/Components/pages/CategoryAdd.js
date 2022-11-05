import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProductService from "../../Services/ProductService";
export default function CategoryAdd() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const ok = async () => {
    await ProductService.createCate(category)
      .then((res) => {
        // alert(res.data);
        console.log(category);
        setType(category);
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        // alert(err.data);
        console.log(err);
      });
  };
  useEffect(() => {}, [type]);
  return (
    <div>
      <h1>Add new category</h1>
      <div>
        <TextField
          label={type}
          id="outlined-size-small"
          size="small"
          // value={category}
          onChange={(e) => setCategory(e.target.value)}
          //   onChange={(e) => setCategory(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            ok();
          }}
        >
          Add New
        </Button>
      </div>
    </div>
  );
}
