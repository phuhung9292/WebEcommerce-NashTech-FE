import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CartService from "../../Services/CartService";
import Button from "@mui/material/Button";
import Order from "../../Services/Order";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CartDetail() {
  const [cartList, setCartList] = useState(null);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadDelete, setLoadDelete] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await CartService.getCart().then((res) => {
          console.log(res.data);
          setCartList(res.data);
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [loadDelete]);
  const deleteProductItem = async (id) => {
    console.log(id);

    await CartService.deleteCart(id).then((res) => {
      console.log(res);
    });
    setLoadDelete(loadDelete + 1);
  };
  const order = async () => {
    await Order.postOrder()
      .then((res) => {
        const mess = res.data.Message;
        alert(mess);
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        alert(err.response.data.message);
        console.log(err);
      });
  };
  //   useEffect(() => {}, [loading]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartList &&
            cartList.map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    <img src={item.image} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <Button
                      variant="outlined"
                      color="error"
                      data-confirm="Are you sure to delete this item?"
                      onClick={() => deleteProductItem(item.productItemId)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      <div>
        {" "}
        <Button variant="contained" color="success" onClick={order}>
          Order
        </Button>
      </div>
    </TableContainer>
  );
}

export default CartDetail;
