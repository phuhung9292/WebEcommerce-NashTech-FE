import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProductService from "../../Services/ProductService";
import { useParams } from "react-router-dom";

function OptionAdd() {
  const [option, setOtion] = useState("");
  const [type, setType] = useState("");
  const { aoid } = useParams();

  const ok = async () => {
    await ProductService.addVariationOption(aoid, option)
      .then((res) => {
        // alert(res.data);
        console.log(option);
        setType(option);
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        // alert(err.data);
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Add new Option</h1>
      <div>
        <TextField
          label={type}
          id="outlined-size-small"
          size="small"
          // value={category}
          onChange={(e) => setOtion(e.target.value)}
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

export default OptionAdd;
