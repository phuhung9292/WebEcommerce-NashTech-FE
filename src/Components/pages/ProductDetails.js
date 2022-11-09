import React, { useEffect, useState } from "react";
// import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../Services/ProductService";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import RatingService from "../../Services/RatingService";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
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
  const [ratings, setRatings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      if (size != 0 && color != 0) {
        setLoading(true);

        await ProductService.getProductItemByProductIdSizeIdColorId(
          productid,
          size,
          color
        )
          .then((res) => {
            console.log(res.data);
            setPrice(res.data.price);
            setProductItemId(res.data.id);
            setQuantity(res.data.quantity);
          })
          .catch((err) => {
            setColor(0);
            setSize(0);
            alert("Not Found");
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
        await ProductService.getProductItem(productid)
          .then((res) => {
            console.log(res.data.data);
            setProductItem(res.data.data);

            console.log(productItem);
          })
          .catch((err) => {
            alert("Not Have Detail");
          });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      console.log(productItem);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await RatingService.getAllRating(productid).then((res) => {
          console.log(res);
          setRatings(res.data);
        });
      } catch (err) {
        console.log(err);
      }
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
    if (!user) {
      alert("Need to login");
      navigate("/login");
    } else if (user.role[0].authority == "Customer") {
      console.log(productItemId, quantityAddToCart);
      await ProductService.addProductItemToCart(
        productItemId,
        quantityAddToCart
      );
      setQuantityAddToCart(0);
    } else if (user.role[0].authority == "Admin") {
      alert("Login User to Add");
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload(false);
    }
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
            {price != 0 && size != 0 && color != 0 && (
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
            {quantityAddToCart >= 1 && size != 0 && color != 0 && (
              <div>
                <Button variant="outlined" onClick={addToCart}>
                  Add to cart
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {ratings.length > 0 && (
        <div>
          {ratings.map((item) => {
            return (
              <div>
                <h4>{item.tblUserByUserid.fullName}</h4>
                <Rating name="read-only" value={item.ratingValue} readOnly />
                <p>{item.comment} </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
  // console.log(productid);

  // return <h1>{productid}</h1>;
}

export default ProductDetail;
