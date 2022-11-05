import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import ProductService from "../../Services/ProductService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpgradeIcon from "@mui/icons-material/Upgrade";

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

function AdminGetAllProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getProductByCateId(id)
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1> List Product By Id: {id}</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name Product</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((item) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="h-32 w-40"
                      >
                        <img src={item.productImage} />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.categoryTypeCategory}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.active && (
                          <div>
                            <p> Active</p>
                          </div>
                        )}
                        {!item.active && (
                          <div>
                            <p> Deleted</p>
                          </div>
                        )}
                      </StyledTableCell>

                      <StyledTableCell>
                        {" "}
                        <Link>
                          <Button variant="contained" endIcon={<SendIcon />}>
                            Product Item
                          </Button>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Link>
                          <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<UpgradeIcon />}
                          >
                            Update
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            variant="contained"
                            endIcon={<DeleteForeverIcon />}
                            color="error"
                          >
                            Delete
                          </Button>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div>
            {" "}
            <Link to={`addProduct/${id}`}>
              <Button variant="contained" color="success">
                Add
              </Button>
            </Link>
          </div>
        </TableContainer>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminGetAllProduct;
