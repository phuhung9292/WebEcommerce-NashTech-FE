import React, { useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import ProductService from "../../Services/ProductService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
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

function Variation() {
  const { vid } = useParams();
  const [variation, setVariation] = useState([]);

  useEffect(() => {
    const fectchData = async () => {
      await ProductService.getVariationByCateId(vid).then((res) => {
        console.log(res.data);
        setVariation(res.data);
      });
    };
    fectchData();
  }, [vid]);
  useEffect(() => {}, [variation]);
  return (
    <div>
      <div>
        <h1>Variation</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variation.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`variations/${item.id}`}>
                      <Button variant="contained" endIcon={<SendIcon />}>
                        Detail
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Outlet />
    </div>
  );
}

export default Variation;
