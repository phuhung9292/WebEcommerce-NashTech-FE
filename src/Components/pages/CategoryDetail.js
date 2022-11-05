import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProductService from "../../Services/ProductService";
export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getCategoryById(id)
        .then((res) => {
          //   console.log(res.data.typeCategory);
          setType(res.data.typeCategory);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [id]);
  const ok = async () => {
    await ProductService.updateCatebyId(id, category)
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
          Ok
        </Button>
      </div>
    </div>
  );
}
