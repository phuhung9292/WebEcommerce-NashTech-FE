import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductService from "../../Services/ProductService";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import IconButton from "@mui/material/IconButton";
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
function Variations() {
  const { vsid } = useParams();
  const [variationOption, setVariationOption] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getVariationOptionByVariationId(vsid).then((res) => {
        setVariationOption(res.data);
        setContent(res.data[0].tblVariationByVariationId.name);
        console.log(res);
      });
    };
    fetchData();
  }, [vsid]);

  return (
    <div>
      <h1>{content}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variationOption.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.value}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            ))}
            <IconButton color="primary">
              <Link to={`addOption/${vsid}`}>
                <ControlPointSharpIcon />
              </Link>
            </IconButton>
          </TableBody>
        </Table>
      </TableContainer>
      <Outlet />
    </div>
  );
}

export default Variations;
