import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Order from "../../Services/Order";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
export default function OrderHistory() {
  const { orderid } = useParams();
  const [products, setProduct] = useState(null);
  const [statusOrder, setStatusOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await Order.getOrderDetail(orderid)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => {
          alert("not found");
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const status = async () => {
      await Order.getStatusOrder(orderid).then((res) => {
        console.log(res.data);
        setStatusOrder(res.data);
      });
    };
    status();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name Product</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Detail</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.tblProductByProductId.name}
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="h-32 w-40"
                  >
                    <img src={item.productImage} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {item.tblProductConfigurationsById.map((item2) => {
                      return (
                        <p>
                          {item2.tblVariationOptionByVariationOptionId.value}
                        </p>
                      );
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {statusOrder.status == 4 && (
                      <Link>
                        <Button variant="outlined">Rating</Button>
                      </Link>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      <div>
        {" "}
        <Button variant="contained" color="success">
          Order
        </Button>
      </div>
    </TableContainer>
  );
}
