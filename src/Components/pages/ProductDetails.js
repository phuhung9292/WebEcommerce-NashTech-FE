import React, { useEffect, useState } from "react";
// import * as React from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../Services/ProductService";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RemoveIcon from "@mui/icons-material/Remove";
// import IconButton from "@material-ui/core/IconButton";
import IconButton from "@mui/material/IconButton";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import Button from "@mui/material/Button";
let count = 0;
function ProductDetail(props) {
  const styleInput = "w-[40px] mt-[5px]";
  const styleInput2 = "w-[30px] items-center";
  const [currentIndex, setCurrentIndex] = useState(0);
  const { productid } = useParams();
  const [productItem, setProductItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const [price, setPrice] = useState(0);
  const [productItemId, setProductItemId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityAddToCart, setQuantityAddToCart] = useState(0);

  useEffect(() => {
    const check = async () => {
      if (size != 0 && color != 0) {
        setLoading(true);

        await ProductService.getProductItemByProductIdSizeIdColorId(
          productid,
          size,
          color
        ).then((res) => {
          console.log(res.data);
          setPrice(res.data.price);
          setProductItemId(res.data.id);
          setQuantity(res.data.quantity);
        });
        setLoading(false);
      }
    };
    check();
  }, [size, color]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getProductItem(productid).then(
          (res) => {
            console.log(res.data.data);
            setProductItem(res.data.data);

            console.log(productItem);
          }
        );
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      console.log(productItem);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (productItem != null)
      productItem.productImage.map((item) => {
        images.push(item.image);
      });

    console.log(productItem);
  }, [productItem]);

  //----------------------------------------------------------------
  useEffect(() => {
    startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % images.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const productLength = images.length;
    count = (currentIndex + productLength - 1) % productLength;
    setCurrentIndex(count);
  };
  const add = () => {
    setQuantityAddToCart(quantityAddToCart + 1);
  };
  const minus = () => {
    if (quantityAddToCart > 0) {
      setQuantityAddToCart(quantityAddToCart - 1);
    }
  };
  const addToCart = async () => {
    console.log(productItemId, quantityAddToCart);
    await ProductService.addProductItemToCart(productItemId, quantityAddToCart);
    setQuantityAddToCart(0);
  };
  useEffect(() => {}, [quantityAddToCart]);
  return (
    <>
      {!loading && (
        <div className="flex flex-1  justify-center">
          <div className="w-2/4 select-none relative flex justify-center ">
            <div className="aspect-w-16 aspect-h-9">
              <img src={images[currentIndex]} />
            </div>
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
              <button onClick={handleOnPrevClick}>
                {" "}
                <ArrowBackIosIcon />
              </button>
              <button onClick={handleOnNextClick}>
                {" "}
                <ArrowForwardIosIcon />
              </button>
            </div>
          </div>
          <div className="inline-flex flex-col ">
            <div> {productItem.name}</div>
            {price != 0 && (
              <div>
                <div>quantity: {quantity}</div>
                <div>price: {price}</div>
                <div className="quantity-group flex flex-1 justify-center">
                  <div>
                    <IconButton>
                      <RemoveIcon color="error" onClick={minus} />
                    </IconButton>
                  </div>

                  <div className={styleInput}>
                    <input
                      type="text"
                      value={quantityAddToCart}
                      className={styleInput2}
                    ></input>
                  </div>
                  <div>
                    <IconButton>
                      <PlusOneRoundedIcon onClick={add} />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                color
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  console.log(color);
                }}
                // value={value}
                se
                // onChange={handleChange}
              >
                {productItem.color.map((item) => {
                  return (
                    <FormControlLabel
                      // {item[0].checked}
                      // checked={true}
                      value={item.id}
                      control={<Radio />}
                      key={item.id}
                      label={item.name}
                    />
                    // <Button size="small" key={item.id}>
                    //   {item.name}
                    // </Button>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                size
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  console.log(size);
                }}
                // onSelect={checked}

                // value={value}
                // onChange={handleChange}
              >
                {productItem.size.map((item, index) => {
                  return (
                    <FormControlLabel
                      value={item.id}
                      control={<Radio />}
                      key={item.id}
                      label={item.name}
                    />
                    // <Button size="small" key={item.id}>
                    //   {item.name}
                    // </Button>
                  );
                })}
              </RadioGroup>
            </FormControl>
            {quantityAddToCart >= 1 && (
              <div>
                <Button variant="outlined" onClick={addToCart}>
                  Add to cart
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  // console.log(productid);

  // return <h1>{productid}</h1>;
}

export default ProductDetail;
