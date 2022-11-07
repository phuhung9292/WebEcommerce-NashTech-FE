import React, { useEffect, useState } from "react";
import UserService from "../../Services/UserService";

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
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import SwipeDownIcon from "@mui/icons-material/SwipeDown";
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
function ManageUser() {
  const [users, setUsers] = useState([]);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await UserService.getAllUsers().then((res) => {
        setUsers(res.data);
        console.log(res);
      });
    };
    fetchData();
  }, [check]);
  const update = async (id) => {
    await UserService.changeRoleUser(id).then((res) => {
      console.log(res);

      setCheck(!check);
    });
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">FullName</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">address</StyledTableCell>
              <StyledTableCell align="right">roleType</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {item.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.phone}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.roleType}
                    </StyledTableCell>

                    <StyledTableCell>
                      {item.roleType === "Customer" ? (
                        <Link>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SwipeUpIcon />}
                            onClick={() => update(item.id)}
                          >
                            To admin
                          </Button>
                        </Link>
                      ) : (
                        <Link>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SwipeDownIcon />}
                            onClick={() => update(item.id)}
                          >
                            To customer
                          </Button>
                        </Link>
                      )}
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
    </div>
  );
}

export default ManageUser;
