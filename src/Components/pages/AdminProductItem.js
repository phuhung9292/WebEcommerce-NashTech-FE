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
function AdminProductItem() {
  const { proid } = useParams();
  const [products, setProducts] = useState("");
  const [cateId, setCateId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await ProductService.adminGetAllProductItemByProductId(proid)
        .then((res) => {
          setProducts(res.data);

          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    console.log(proid);
    fetchData();
  }, [proid]);
  return (
    <div>
      <h1> List ProductItem By Id: {proid}</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name Product</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Create Date</StyledTableCell>
                <StyledTableCell align="right">Update Date</StyledTableCell>
                <StyledTableCell align="right">Option</StyledTableCell>
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
                        {item.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.createDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.updateDate}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {item.tblProductConfigurationsById.map((option) => {
                          return (
                            <div>
                              {
                                option.tblVariationOptionByVariationOptionId
                                  .value
                              }
                            </div>
                          );
                        })}
                      </StyledTableCell>

                      <StyledTableCell>
                        {" "}
                        <Link to={`updateProductItem/${item.id}`}>
                          <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<UpgradeIcon />}
                          >
                            Update
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
            <Link to={`addProductItem/${proid}`}>
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

export default AdminProductItem;
