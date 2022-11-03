import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

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

function ProfileUser() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Order.userGetOrder().then((res) => {
          console.log(res.data);
          setOrders(res.data);
        });
      } catch (err) {}
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2 className="text-center">View History Order</h2>

      <div className="styleContent ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Code orders</StyledTableCell>
                <StyledTableCell align="right">Order date</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((item) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.orderDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        {item.total}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        {item.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        <Link to={`/orderDetail/${item.id}`}>
                          <Button variant="outlined" color="error">
                            Detail
                          </Button>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ProfileUser;
