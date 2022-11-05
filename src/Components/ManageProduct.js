import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductService from "../Services/ProductService";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Link, Outlet } from "react-router-dom";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import IconButton from "@mui/material/IconButton";
function ManageProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await ProductService.getAllCategory().then((res) => {
          console.log(res.data);
          setCategories(res.data);
          console.log(categories);
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {}, [loading]);
  useEffect(() => {}, [categories]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Type categories</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          {categories != null && (
            <TableBody>
              {categories.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.typeCategory}</TableCell>
                    <TableCell align="right">
                      <Link to={`view-products/${item.id}`}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                          Detail
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`variation/${item.id}`}>
                        <Button variant="contained">Variation</Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`edit-category/${item.id}`}>
                        <Button variant="outlined">Edit</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
        <IconButton color="primary">
          <Link to={"add"}>
            <ControlPointSharpIcon />
          </Link>
        </IconButton>
      </TableContainer>
      <Outlet />
    </div>
  );
}

export default ManageProduct;
