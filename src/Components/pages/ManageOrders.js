import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import OrderService from "../../Services/OrderService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
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
function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const [chooseStatus, setChooseStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [check, setCheck] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await OrderService.adminGetAllOrders().then((res) => {
        setOrders(res.data);
        console.log(res);
      });
      await OrderService.getAllStatus().then((res) => {
        setStatus(res.data);
        console.log(res);
      });
    };
    fetchData();
  }, [check]);
  useEffect(() => {
    const update = async () => {
      await OrderService.adminChangeStatusOrder(orderId, chooseStatus).then(
        (res) => {
          console.log(res);
        }
      );
    };
    setCheck(!check);
    update();
  }, [chooseStatus]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">User Name</StyledTableCell>
              <StyledTableCell align="right">Order Date</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
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
                      {item.userName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.orderDate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.total}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Link to={`admin-order-detail/${item.id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          endIcon={<UpgradeIcon />}
                        >
                          Detail
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {item.status}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={(e) => {
                            setChooseStatus(e.target.value);
                            setOrderId(item.id);
                          }}
                        >
                          {status.map((item) => {
                            return (
                              <MenuItem value={item.id}>{item.status}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <div>
      {" "}
      <Link to={`addProductItem/${proid}`}>
        <Button variant="contained" color="success">
          Add
        </Button>
      </Link>
    </div> */}
      </TableContainer>
      <Outlet />
    </div>
  );
}

export default ManageOrders;
